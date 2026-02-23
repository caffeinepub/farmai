import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Initialize the user system state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type UserRole = AccessControl.UserRole;

  // Extended user type to distinguish between farmer and buyer
  public type UserType = {
    #admin;
    #farmer;
    #buyer;
  };

  public type UserProfile = {
    email : Text;
    passwordHash : Text;
    role : UserRole; // AccessControl role (#admin, #user, #guest)
    userType : UserType; // Application-specific type
    name : ?Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  // Get caller's own profile
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view profiles");
    };
    userProfiles.get(caller);
  };

  // Get any user's profile (admin can view all, users can only view their own)
  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  // Save caller's profile - CRITICAL: Users cannot change their role
  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can save profiles");
    };

    // Get existing profile to preserve role
    switch (userProfiles.get(caller)) {
      case (?existingProfile) {
        // User can update their profile but NOT their role or userType
        let updatedProfile : UserProfile = {
          email = profile.email;
          passwordHash = profile.passwordHash;
          role = existingProfile.role; // Preserve existing role
          userType = existingProfile.userType; // Preserve existing userType
          name = profile.name;
        };
        userProfiles.add(caller, updatedProfile);
      };
      case null {
        Runtime.trap("Profile does not exist. Use registration endpoint.");
      };
    };
  };

  // Register a new farmer account
  public shared ({ caller }) func registerFarmer(email : Text, passwordHash : Text, name : ?Text) : async () {
    // Check if profile already exists
    switch (userProfiles.get(caller)) {
      case (?_) {
        Runtime.trap("User already registered");
      };
      case null {
        let profile : UserProfile = {
          email = email;
          passwordHash = passwordHash;
          role = #user;
          userType = #farmer;
          name = name;
        };
        userProfiles.add(caller, profile);
        // Assign user role in access control
        AccessControl.assignRole(accessControlState, caller, caller, #user);
      };
    };
  };

  // Register a new buyer account
  public shared ({ caller }) func registerBuyer(email : Text, passwordHash : Text, name : ?Text) : async () {
    // Check if profile already exists
    switch (userProfiles.get(caller)) {
      case (?_) {
        Runtime.trap("User already registered");
      };
      case null {
        let profile : UserProfile = {
          email = email;
          passwordHash = passwordHash;
          role = #user;
          userType = #buyer;
          name = name;
        };
        userProfiles.add(caller, profile);
        // Assign user role in access control
        AccessControl.assignRole(accessControlState, caller, caller, #user);
      };
    };
  };

  // Admin-only: Create admin account
  public shared ({ caller }) func createAdminAccount(user : Principal, email : Text, passwordHash : Text, name : ?Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can create admin accounts");
    };

    let profile : UserProfile = {
      email = email;
      passwordHash = passwordHash;
      role = #admin;
      userType = #admin;
      name = name;
    };
    userProfiles.add(user, profile);
    // Assign admin role in access control (includes admin-only guard)
    AccessControl.assignRole(accessControlState, caller, user, #admin);
  };

  // Admin-only: Change user role
  public shared ({ caller }) func changeUserRole(user : Principal, newUserType : UserType) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can change user roles");
    };

    switch (userProfiles.get(user)) {
      case (?existingProfile) {
        let newRole : UserRole = switch (newUserType) {
          case (#admin) { #admin };
          case (#farmer or #buyer) { #user };
        };

        let updatedProfile : UserProfile = {
          email = existingProfile.email;
          passwordHash = existingProfile.passwordHash;
          role = newRole;
          userType = newUserType;
          name = existingProfile.name;
        };
        userProfiles.add(user, updatedProfile);
        AccessControl.assignRole(accessControlState, caller, user, newRole);
      };
      case null {
        Runtime.trap("User profile not found");
      };
    };
  };

  // Admin-only: List all users
  public query ({ caller }) func listAllUsers() : async [(Principal, UserProfile)] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can list all users");
    };
    userProfiles.toArray();
  };

  // Admin-only: Delete user account
  public shared ({ caller }) func deleteUserAccount(user : Principal) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete user accounts");
    };
    userProfiles.remove(user);
  };

  // Check if caller is a farmer
  public query ({ caller }) func isCallerFarmer() : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      return false;
    };
    switch (userProfiles.get(caller)) {
      case (?profile) {
        switch (profile.userType) {
          case (#farmer) { true };
          case _ { false };
        };
      };
      case null { false };
    };
  };

  // Check if caller is a buyer
  public query ({ caller }) func isCallerBuyer() : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      return false;
    };
    switch (userProfiles.get(caller)) {
      case (?profile) {
        switch (profile.userType) {
          case (#buyer) { true };
          case _ { false };
        };
      };
      case null { false };
    };
  };
};

