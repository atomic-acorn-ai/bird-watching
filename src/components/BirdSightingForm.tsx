
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Cloud } from "lucide-react";
import { BirdSighting } from "@/pages/Index";
import { birdSpecies } from "@/data/birdSpecies";
import { toast } from "@/hooks/use-toast";

interface BirdSightingFormProps {
  onAddSighting: (sighting: BirdSighting) => void;
}

const BirdSightingForm: React.FC<BirdSightingFormProps> = ({ onAddSighting }) => {
  const [selectedSpecies, setSelectedSpecies] = useState('');
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    address: ''
  });
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [weather, setWeather] = useState({
    temperature: 0,
    condition: '',
    humidity: 0
  });
  const [notes, setNotes] = useState('');
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);

  useEffect(() => {
    const now = new Date();
    setDate(now.toISOString().split('T')[0]);
    setTime(now.toTimeString().slice(0, 5));
  }, []);

  const getCurrentLocation = async () => {
    setIsLoadingLocation(true);
    try {
      if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported');
      }

      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude, longitude } = position.coords;
      
      // Reverse geocoding to get address
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
      );
      const data = await response.json();
      
      setLocation({
        latitude,
        longitude,
        address: data.locality ? `${data.locality}, ${data.countryName}` : 'Unknown location'
      });

      toast({
        title: "Location detected",
        description: "Your current location has been set.",
      });

      // Auto-fetch weather for current location
      fetchWeather(latitude, longitude);
    } catch (error) {
      console.error('Error getting location:', error);
      toast({
        title: "Location error",
        description: "Could not get your current location. Please enter manually.",
        variant: "destructive",
      });
    }
    setIsLoadingLocation(false);
  };

  const fetchWeather = async (lat: number, lon: number) => {
    setIsLoadingWeather(true);
    try {
      // Using a mock weather service for demo purposes
      // In a real app, you'd use OpenWeatherMap or similar
      const mockWeather = {
        temperature: Math.round(Math.random() * 30 + 5),
        condition: ['Sunny', 'Cloudy', 'Partly Cloudy', 'Overcast'][Math.floor(Math.random() * 4)],
        humidity: Math.round(Math.random() * 40 + 40)
      };
      
      setWeather(mockWeather);
      
      toast({
        title: "Weather updated",
        description: `Current conditions: ${mockWeather.condition}, ${mockWeather.temperature}°C`,
      });
    } catch (error) {
      console.error('Error fetching weather:', error);
      toast({
        title: "Weather error",
        description: "Could not fetch weather data.",
        variant: "destructive",
      });
    }
    setIsLoadingWeather(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedSpecies || !location.address || !date || !time) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const selectedBird = birdSpecies.find(bird => bird.id === selectedSpecies);
    if (!selectedBird) return;

    const newSighting: BirdSighting = {
      id: Date.now().toString(),
      species: selectedBird.id,
      commonName: selectedBird.commonName,
      location,
      date,
      time,
      weather,
      notes
    };

    onAddSighting(newSighting);
    
    // Reset form
    setSelectedSpecies('');
    setNotes('');
    
    toast({
      title: "Sighting added!",
      description: `${selectedBird.commonName} has been added to your catalog.`,
    });
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-green-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-700">
          <MapPin className="h-5 w-5" />
          Record Bird Sighting
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Bird Species Selection */}
          <div className="space-y-2">
            <Label htmlFor="species">Bird Species *</Label>
            <Select value={selectedSpecies} onValueChange={setSelectedSpecies}>
              <SelectTrigger>
                <SelectValue placeholder="Select a bird species" />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {birdSpecies.map((bird) => (
                  <SelectItem key={bird.id} value={bird.id}>
                    {bird.commonName} ({bird.scientificName})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label>Location *</Label>
            <div className="flex gap-2">
              <Input
                value={location.address}
                onChange={(e) => setLocation(prev => ({ ...prev, address: e.target.value }))}
                placeholder="Enter location manually"
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                onClick={getCurrentLocation}
                disabled={isLoadingLocation}
                className="flex items-center gap-2"
              >
                <MapPin className="h-4 w-4" />
                {isLoadingLocation ? 'Getting...' : 'Use Current'}
              </Button>
            </div>
            {location.latitude !== 0 && (
              <p className="text-sm text-gray-600">
                Coordinates: {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
              </p>
            )}
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time *</Label>
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Weather */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Cloud className="h-5 w-5 text-blue-600" />
              <Label>Weather Conditions</Label>
              {location.latitude !== 0 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fetchWeather(location.latitude, location.longitude)}
                  disabled={isLoadingWeather}
                >
                  {isLoadingWeather ? 'Loading...' : 'Refresh Weather'}
                </Button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="temperature">Temperature (°C)</Label>
                <Input
                  id="temperature"
                  type="number"
                  value={weather.temperature || ''}
                  onChange={(e) => setWeather(prev => ({ ...prev, temperature: Number(e.target.value) }))}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="condition">Condition</Label>
                <Select
                  value={weather.condition}
                  onValueChange={(value) => setWeather(prev => ({ ...prev, condition: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sunny">Sunny</SelectItem>
                    <SelectItem value="Partly Cloudy">Partly Cloudy</SelectItem>
                    <SelectItem value="Cloudy">Cloudy</SelectItem>
                    <SelectItem value="Overcast">Overcast</SelectItem>
                    <SelectItem value="Rainy">Rainy</SelectItem>
                    <SelectItem value="Stormy">Stormy</SelectItem>
                    <SelectItem value="Foggy">Foggy</SelectItem>
                    <SelectItem value="Snowy">Snowy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="humidity">Humidity (%)</Label>
                <Input
                  id="humidity"
                  type="number"
                  value={weather.humidity || ''}
                  onChange={(e) => setWeather(prev => ({ ...prev, humidity: Number(e.target.value) }))}
                  placeholder="0"
                  min="0"
                  max="100"
                />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any additional observations or notes..."
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
            Add Sighting
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BirdSightingForm;
