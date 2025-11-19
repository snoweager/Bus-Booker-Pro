import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import BookingCard from './components/BookingCard';
import BookingFilters from './components/BookingFilters';
import BookingStats from './components/BookingStats';
import ModificationModal from './components/ModificationModal';
import CancellationModal from './components/CancellationModal';
import SupportModal from './components/SupportModal';

const BookingManagement = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [modificationModal, setModificationModal] = useState(false);
  const [cancellationModal, setCancellationModal] = useState(false);
  const [supportModal, setSupportModal] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Mock bookings data
  const mockBookings = [
  {
    bookingId: "BUS-2024-001",
    origin: "New York",
    destination: "Washington DC",
    departureDate: "2024-10-20",
    departureTime: "08:30",
    arrivalTime: "12:45",
    duration: "4h 15m",
    distance: "225 miles",
    status: "confirmed",
    busOperator: {
      name: "Greyhound Lines",
      logo: "https://images.unsplash.com/photo-1646749701723-df0ed10e40e3",
      logoAlt: "Greyhound Lines logo with distinctive running dog silhouette in blue and white"
    },
    busType: "Express Coach",
    busNumber: "GL-4521",
    departureTerminal: "Port Authority Bus Terminal",
    arrivalTerminal: "Union Station",
    seatNumbers: ["12A", "12B"],
    passengers: [
    {
      name: "John Smith",
      age: 32,
      gender: "Male",
      phone: "+1-555-0123"
    },
    {
      name: "Jane Smith",
      age: 29,
      gender: "Female",
      phone: "+1-555-0124"
    }],

    totalAmount: "89.50",
    baseFare: "75.00",
    taxes: "12.50",
    discount: "0.00",
    paymentStatus: "paid",
    paymentMethod: "Credit Card",
    transactionId: "TXN-789456123",
    bookingDate: "2024-10-10T14:30:00Z"
  },
  {
    bookingId: "BUS-2024-002",
    origin: "Boston",
    destination: "New York",
    departureDate: "2024-11-05",
    departureTime: "15:20",
    arrivalTime: "19:35",
    duration: "4h 15m",
    distance: "215 miles",
    status: "confirmed",
    busOperator: {
      name: "Megabus",
      logo: "https://images.unsplash.com/photo-1500844861738-30de46b860f9",
      logoAlt: "Megabus company logo featuring bold blue lettering with modern transport design"
    },
    busType: "Double Decker",
    busNumber: "MB-7834",
    departureTerminal: "South Station",
    arrivalTerminal: "Port Authority",
    seatNumbers: ["25C"],
    passengers: [
    {
      name: "Michael Johnson",
      age: 28,
      gender: "Male",
      phone: "+1-555-0789"
    }],

    totalAmount: "45.00",
    baseFare: "38.00",
    taxes: "7.00",
    discount: "5.00",
    paymentStatus: "paid",
    paymentMethod: "PayPal",
    transactionId: "TXN-456789012",
    bookingDate: "2024-10-12T09:15:00Z"
  },
  {
    bookingId: "BUS-2024-003",
    origin: "Philadelphia",
    destination: "Baltimore",
    departureDate: "2024-09-15",
    departureTime: "11:00",
    arrivalTime: "13:30",
    duration: "2h 30m",
    distance: "95 miles",
    status: "completed",
    busOperator: {
      name: "Peter Pan Bus Lines",
      logo: "https://images.unsplash.com/photo-1663250714102-3f85deedf64b",
      logoAlt: "Peter Pan Bus Lines logo with classic green and white color scheme and vintage design"
    },
    busType: "Standard Coach",
    busNumber: "PP-2156",
    departureTerminal: "30th Street Station",
    arrivalTerminal: "Baltimore Travel Plaza",
    seatNumbers: ["8D"],
    passengers: [
    {
      name: "Sarah Wilson",
      age: 35,
      gender: "Female",
      phone: "+1-555-0456"
    }],

    totalAmount: "32.00",
    baseFare: "28.00",
    taxes: "4.00",
    discount: "0.00",
    paymentStatus: "paid",
    paymentMethod: "Debit Card",
    transactionId: "TXN-123456789",
    bookingDate: "2024-09-10T16:45:00Z"
  },
  {
    bookingId: "BUS-2024-004",
    origin: "Chicago",
    destination: "Detroit",
    departureDate: "2024-10-25",
    departureTime: "07:45",
    arrivalTime: "13:20",
    duration: "5h 35m",
    distance: "280 miles",
    status: "pending",
    busOperator: {
      name: "FlixBus",
      logo: "https://images.unsplash.com/photo-1589056411110-81114028841e",
      logoAlt: "FlixBus logo with distinctive green and orange branding and modern European design"
    },
    busType: "Premium Coach",
    busNumber: "FB-9876",
    departureTerminal: "Union Station Chicago",
    arrivalTerminal: "Detroit Bus Terminal",
    seatNumbers: ["15A", "15B", "16A"],
    passengers: [
    {
      name: "David Brown",
      age: 42,
      gender: "Male",
      phone: "+1-555-0321"
    },
    {
      name: "Lisa Brown",
      age: 38,
      gender: "Female",
      phone: "+1-555-0322"
    },
    {
      name: "Tommy Brown",
      age: 12,
      gender: "Male",
      phone: "+1-555-0321"
    }],

    totalAmount: "156.75",
    baseFare: "135.00",
    taxes: "21.75",
    discount: "10.00",
    paymentStatus: "pending",
    paymentMethod: "Credit Card",
    transactionId: "TXN-987654321",
    bookingDate: "2024-10-15T11:20:00Z"
  }];


  // Load bookings and language preference
  useEffect(() => {
    const loadBookings = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setBookings(mockBookings);
        setFilteredBookings(mockBookings);
      } catch (error) {
        console.error('Failed to load bookings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    setCurrentLanguage(savedLanguage);

    loadBookings();
  }, []);

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/user-authentication');
    }
  }, [navigate]);

  const handleFilterChange = (filters) => {
    let filtered = [...bookings];

    // Search filter
    if (filters?.searchTerm) {
      const searchTerm = filters?.searchTerm?.toLowerCase();
      filtered = filtered?.filter((booking) =>
      booking?.bookingId?.toLowerCase()?.includes(searchTerm) ||
      booking?.origin?.toLowerCase()?.includes(searchTerm) ||
      booking?.destination?.toLowerCase()?.includes(searchTerm) ||
      booking?.busOperator?.name?.toLowerCase()?.includes(searchTerm)
      );
    }

    // Status filter
    if (filters?.status) {
      filtered = filtered?.filter((booking) => booking?.status === filters?.status);
    }

    // Date range filter
    if (filters?.dateRange) {
      const now = new Date();
      filtered = filtered?.filter((booking) => {
        const departureDate = new Date(booking.departureDate);
        switch (filters?.dateRange) {
          case 'upcoming':
            return departureDate > now;
          case 'past':
            return departureDate < now;
          case 'thisMonth':
            return departureDate?.getMonth() === now?.getMonth() &&
            departureDate?.getFullYear() === now?.getFullYear();
          case 'lastMonth':
            const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1);
            return departureDate?.getMonth() === lastMonth?.getMonth() &&
            departureDate?.getFullYear() === lastMonth?.getFullYear();
          case 'last3Months':
            const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3);
            return departureDate >= threeMonthsAgo;
          default:
            return true;
        }
      });
    }

    // Sort
    filtered?.sort((a, b) => {
      switch (filters?.sortBy) {
        case 'departureDate':
          return new Date(b.departureDate) - new Date(a.departureDate);
        case 'bookingDate':
          return new Date(b.bookingDate) - new Date(a.bookingDate);
        case 'amount':
          return parseFloat(b?.totalAmount) - parseFloat(a?.totalAmount);
        case 'status':
          return a?.status?.localeCompare(b?.status);
        default:
          return 0;
      }
    });

    setFilteredBookings(filtered);
  };

  const handleClearFilters = () => {
    setFilteredBookings(bookings);
  };

  const handleModifyBooking = (booking) => {
    setSelectedBooking(booking);
    setModificationModal(true);
  };

  const handleCancelBooking = (booking) => {
    setSelectedBooking(booking);
    setCancellationModal(true);
  };

  const handleSupportRequest = (booking) => {
    setSelectedBooking(booking);
    setSupportModal(true);
  };

  const handleDownloadTicket = (booking) => {
    // Simulate ticket download
    const ticketData = {
      bookingId: booking?.bookingId,
      route: `${booking?.origin} → ${booking?.destination}`,
      date: booking?.departureDate,
      passengers: booking?.passengers?.length,
      amount: booking?.totalAmount
    };

    const dataStr = JSON.stringify(ticketData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ticket-${booking?.bookingId}.json`;
    link?.click();
    URL.revokeObjectURL(url);
  };

  const handleViewDetails = (booking) => {
    navigate('/booking-confirmation', { state: { booking } });
  };

  const handleModificationConfirm = (modificationData) => {
    // Update booking with modification
    const updatedBookings = bookings?.map((booking) => {
      if (booking?.bookingId === modificationData?.bookingId) {
        return {
          ...booking,
          status: 'pending', // Status changes to pending after modification
          lastModified: new Date()?.toISOString()
        };
      }
      return booking;
    });

    setBookings(updatedBookings);
    setFilteredBookings(updatedBookings);
    alert('Booking modification request submitted successfully!');
  };

  const handleCancellationConfirm = (cancellationData) => {
    // Update booking status to cancelled
    const updatedBookings = bookings?.map((booking) => {
      if (booking?.bookingId === cancellationData?.bookingId) {
        return {
          ...booking,
          status: 'cancelled',
          cancellationDate: new Date()?.toISOString(),
          refundAmount: cancellationData?.refundDetails?.refundAmount
        };
      }
      return booking;
    });

    setBookings(updatedBookings);
    setFilteredBookings(updatedBookings);
    alert('Booking cancelled successfully! Refund will be processed according to our policy.');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>Loading Bookings - BusBooker Pro</title>
        </Helmet>
        <Header />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading your bookings...</p>
              </div>
            </div>
          </div>
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>My Bookings - BusBooker Pro</title>
        <meta name="description" content="Manage your bus bookings, modify reservations, and track your travel history with BusBooker Pro." />
      </Helmet>
      <Header />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
              <Link to="/landing-page" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <Icon name="ChevronRight" size={14} />
              <Link to="/user-dashboard" className="hover:text-foreground transition-colors">
                Dashboard
              </Link>
              <Icon name="ChevronRight" size={14} />
              <span className="text-foreground">My Bookings</span>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">My Bookings</h1>
                <p className="text-muted-foreground mt-1">
                  Manage your reservations and travel history
                </p>
              </div>
              
              <div className="mt-4 sm:mt-0 flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => navigate('/landing-page')}
                  iconName="Plus"
                  iconPosition="left">

                  New Booking
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.print()}
                  iconName="Printer"
                  iconPosition="left">

                  Print
                </Button>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <BookingStats bookings={bookings} />

          {/* Filters */}
          <BookingFilters
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters} />


          {/* Bookings List */}
          <div className="space-y-6">
            {filteredBookings?.length === 0 ?
            <div className="text-center py-12">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Calendar" size={32} className="text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No Bookings Found</h3>
                <p className="text-muted-foreground mb-6">
                  {bookings?.length === 0 ?
                "You haven't made any bookings yet. Start planning your next trip!" : "No bookings match your current filters. Try adjusting your search criteria."
                }
                </p>
                <Button
                onClick={() => navigate('/landing-page')}
                iconName="Search"
                iconPosition="left">

                  Book Your First Trip
                </Button>
              </div> :

            filteredBookings?.map((booking) =>
            <BookingCard
              key={booking?.bookingId}
              booking={booking}
              onModify={handleModifyBooking}
              onCancel={handleCancelBooking}
              onDownload={handleDownloadTicket}
              onViewDetails={handleViewDetails} />

            )
            }
          </div>

          {/* Quick Actions */}
          <div className="mt-12 bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Need Help?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                variant="outline"
                onClick={() => setSupportModal(true)}
                iconName="HelpCircle"
                iconPosition="left"
                className="justify-start">

                <div className="text-left">
                  <div>Contact Support</div>
                  <div className="text-xs text-muted-foreground">Get help with your bookings</div>
                </div>
              </Button>
              
              <Button
                variant="outline"
                onClick={() => navigate('/user-dashboard')}
                iconName="User"
                iconPosition="left"
                className="justify-start">

                <div className="text-left">
                  <div>Account Settings</div>
                  <div className="text-xs text-muted-foreground">Manage your profile</div>
                </div>
              </Button>
              
              <Button
                variant="outline"
                onClick={() => navigate('/landing-page')}
                iconName="Search"
                iconPosition="left"
                className="justify-start">

                <div className="text-left">
                  <div>Book New Trip</div>
                  <div className="text-xs text-muted-foreground">Find and book tickets</div>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Modals */}
      {selectedBooking &&
      <>
          <ModificationModal
          booking={selectedBooking}
          isOpen={modificationModal}
          onClose={() => {
            setModificationModal(false);
            setSelectedBooking(null);
          }}
          onConfirm={handleModificationConfirm} />

          
          <CancellationModal
          booking={selectedBooking}
          isOpen={cancellationModal}
          onClose={() => {
            setCancellationModal(false);
            setSelectedBooking(null);
          }}
          onConfirm={handleCancellationConfirm} />

          
          <SupportModal
          booking={selectedBooking}
          isOpen={supportModal}
          onClose={() => {
            setSupportModal(false);
            setSelectedBooking(null);
          }} />

        </>
      }
    </div>);

};

export default BookingManagement;