
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BirdSightingForm from "@/components/BirdSightingForm";
import SightingsCatalog from "@/components/SightingsCatalog";
import { Binoculars, MapPin, Calendar } from "lucide-react";

export interface BirdSighting {
  id: string;
  species: string;
  commonName: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  date: string;
  time: string;
  weather: {
    temperature: number;
    condition: string;
    humidity: number;
  };
  notes?: string;
}

const Index = () => {
  const [sightings, setSightings] = useState<BirdSighting[]>([]);

  useEffect(() => {
    const savedSightings = localStorage.getItem('birdSightings');
    if (savedSightings) {
      setSightings(JSON.parse(savedSightings));
    }
  }, []);

  const addSighting = (sighting: BirdSighting) => {
    const newSightings = [...sightings, sighting];
    setSightings(newSightings);
    localStorage.setItem('birdSightings', JSON.stringify(newSightings));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-amber-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Binoculars className="h-8 w-8 text-green-600" />
            <h1 className="text-4xl font-bold text-gray-800">BirdWatch</h1>
          </div>
          <p className="text-lg text-gray-600">Your personal bird sighting catalog</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/70 backdrop-blur-sm border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Binoculars className="h-6 w-6 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Total Sightings</p>
                  <p className="text-2xl font-bold text-gray-800">{sightings.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <MapPin className="h-6 w-6 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Unique Species</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {new Set(sightings.map(s => s.species)).size}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-amber-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Calendar className="h-6 w-6 text-amber-600" />
                <div>
                  <p className="text-sm text-gray-600">Last Sighting</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {sightings.length > 0 ? 'Today' : 'None'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="add" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="add" className="flex items-center gap-2">
              <Binoculars className="h-4 w-4" />
              Add Sighting
            </TabsTrigger>
            <TabsTrigger value="catalog" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              View Catalog
            </TabsTrigger>
          </TabsList>

          <TabsContent value="add">
            <BirdSightingForm onAddSighting={addSighting} />
          </TabsContent>

          <TabsContent value="catalog">
            <SightingsCatalog sightings={sightings} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
