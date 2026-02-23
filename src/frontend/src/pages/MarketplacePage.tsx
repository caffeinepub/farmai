import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingCart, Plus, Search, MapPin, Phone, User } from 'lucide-react';
import { toast } from 'sonner';

interface CropListing {
  id: string;
  cropName: string;
  quantity: number;
  price: number;
  location: string;
  farmerName: string;
  contact: string;
  image: string;
}

export default function MarketplacePage() {
  const [listings, setListings] = useState<CropListing[]>([
    {
      id: '1',
      cropName: 'Rice',
      quantity: 50,
      price: 2000,
      location: 'Punjab',
      farmerName: 'Rajesh Kumar',
      contact: '+91 98765 43210',
      image: '/assets/generated/rice-icon.dim_128x128.png',
    },
    {
      id: '2',
      cropName: 'Wheat',
      quantity: 40,
      price: 2200,
      location: 'Haryana',
      farmerName: 'Suresh Patel',
      contact: '+91 98765 43211',
      image: '/assets/generated/wheat-icon.dim_128x128.png',
    },
    {
      id: '3',
      cropName: 'Cotton',
      quantity: 30,
      price: 5500,
      location: 'Gujarat',
      farmerName: 'Amit Shah',
      contact: '+91 98765 43212',
      image: '/assets/generated/cotton-icon.dim_128x128.png',
    },
    {
      id: '4',
      cropName: 'Corn',
      quantity: 35,
      price: 1800,
      location: 'Karnataka',
      farmerName: 'Ramesh Reddy',
      contact: '+91 98765 43213',
      image: '/assets/generated/corn-icon.dim_128x128.png',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCrop, setFilterCrop] = useState('all');
  const [filterLocation, setFilterLocation] = useState('all');
  const [dialogOpen, setDialogOpen] = useState(false);

  const [newListing, setNewListing] = useState({
    cropName: '',
    quantity: '',
    price: '',
    location: '',
    farmerName: '',
    contact: '',
  });

  const handleAddListing = () => {
    if (!newListing.cropName || !newListing.quantity || !newListing.price || !newListing.location || !newListing.farmerName || !newListing.contact) {
      toast.error('Please fill all fields');
      return;
    }

    const cropImages: { [key: string]: string } = {
      rice: '/assets/generated/rice-icon.dim_128x128.png',
      wheat: '/assets/generated/wheat-icon.dim_128x128.png',
      corn: '/assets/generated/corn-icon.dim_128x128.png',
      cotton: '/assets/generated/cotton-icon.dim_128x128.png',
    };

    const listing: CropListing = {
      id: Date.now().toString(),
      cropName: newListing.cropName,
      quantity: parseFloat(newListing.quantity),
      price: parseFloat(newListing.price),
      location: newListing.location,
      farmerName: newListing.farmerName,
      contact: newListing.contact,
      image: cropImages[newListing.cropName.toLowerCase()] || '/assets/generated/wheat-icon.dim_128x128.png',
    };

    setListings([listing, ...listings]);
    setNewListing({ cropName: '', quantity: '', price: '', location: '', farmerName: '', contact: '' });
    setDialogOpen(false);
    toast.success('Listing added successfully!');
  };

  const filteredListings = listings.filter((listing) => {
    const matchesSearch = listing.cropName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCrop = filterCrop === 'all' || listing.cropName.toLowerCase() === filterCrop.toLowerCase();
    const matchesLocation = filterLocation === 'all' || listing.location.toLowerCase().includes(filterLocation.toLowerCase());
    return matchesSearch && matchesCrop && matchesLocation;
  });

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-background to-muted/30 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner */}
        <div
          className="relative rounded-2xl overflow-hidden mb-8 h-48"
          style={{
            backgroundImage: 'url(/assets/generated/marketplace-banner.dim_1400x400.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 flex items-center">
            <div className="container mx-auto px-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-lg bg-amber-100 dark:bg-amber-950 flex items-center justify-center">
                  <ShoppingCart className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white">Marketplace</h1>
              </div>
              <p className="text-white/90 text-lg">
                Connect directly with buyers and sell your crops without middlemen
              </p>
            </div>
          </div>
        </div>

        {/* Filters and Add Button */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search crops or locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={filterCrop} onValueChange={setFilterCrop}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filter by crop" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Crops</SelectItem>
              <SelectItem value="rice">Rice</SelectItem>
              <SelectItem value="wheat">Wheat</SelectItem>
              <SelectItem value="corn">Corn</SelectItem>
              <SelectItem value="cotton">Cotton</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterLocation} onValueChange={setFilterLocation}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filter by location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="punjab">Punjab</SelectItem>
              <SelectItem value="haryana">Haryana</SelectItem>
              <SelectItem value="gujarat">Gujarat</SelectItem>
              <SelectItem value="karnataka">Karnataka</SelectItem>
            </SelectContent>
          </Select>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full md:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                Add Listing
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Crop Listing</DialogTitle>
                <DialogDescription>
                  List your crop for sale in the marketplace
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="cropName">Crop Name</Label>
                  <Input
                    id="cropName"
                    value={newListing.cropName}
                    onChange={(e) => setNewListing({ ...newListing, cropName: e.target.value })}
                    placeholder="e.g., Rice, Wheat"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity (quintals)</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={newListing.quantity}
                    onChange={(e) => setNewListing({ ...newListing, quantity: e.target.value })}
                    placeholder="e.g., 50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price per Quintal (₹)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newListing.price}
                    onChange={(e) => setNewListing({ ...newListing, price: e.target.value })}
                    placeholder="e.g., 2000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={newListing.location}
                    onChange={(e) => setNewListing({ ...newListing, location: e.target.value })}
                    placeholder="e.g., Punjab"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="farmerName">Your Name</Label>
                  <Input
                    id="farmerName"
                    value={newListing.farmerName}
                    onChange={(e) => setNewListing({ ...newListing, farmerName: e.target.value })}
                    placeholder="e.g., Rajesh Kumar"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact">Contact Number</Label>
                  <Input
                    id="contact"
                    value={newListing.contact}
                    onChange={(e) => setNewListing({ ...newListing, contact: e.target.value })}
                    placeholder="e.g., +91 98765 43210"
                  />
                </div>
                <Button onClick={handleAddListing} className="w-full">
                  Add Listing
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Listings Grid */}
        {filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing) => (
              <Card key={listing.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <img
                      src={listing.image}
                      alt={listing.cropName}
                      className="w-20 h-20 rounded-lg object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/assets/generated/wheat-icon.dim_128x128.png';
                      }}
                    />
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-1">{listing.cropName}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {listing.location}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="text-sm text-muted-foreground">Quantity</span>
                    <span className="font-semibold">{listing.quantity} quintals</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="text-sm text-muted-foreground">Price</span>
                    <span className="font-semibold text-lg text-primary">₹{listing.price}/quintal</span>
                  </div>
                  <div className="pt-2 space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{listing.farmerName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{listing.contact}</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant="default">
                    <img
                      src="/assets/generated/handshake-icon.dim_96x96.png"
                      alt="Connect"
                      className="h-4 w-4 mr-2"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    Contact Farmer
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="py-12">
            <CardContent className="text-center">
              <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Listings Found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filters, or add a new listing
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
