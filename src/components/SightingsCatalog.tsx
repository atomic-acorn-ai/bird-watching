
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Cloud } from "lucide-react";
import { BirdSighting } from "@/pages/Index";
import { birdSpecies } from "@/data/birdSpecies";

interface SightingsCatalogProps {
  sightings: BirdSighting[];
}

const SightingsCatalog: React.FC<SightingsCatalogProps> = ({ sightings }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSightings = sightings.filter(sighting =>
    sighting.commonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sighting.location.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getBirdDetails = (speciesId: string) => {
    return birdSpecies.find(bird => bird.id === speciesId);
  };

  if (sightings.length === 0) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
        <CardContent className="p-8 text-center">
          <div className="text-gray-500">
            <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">No sightings yet</h3>
            <p>Start recording your bird observations to build your catalog!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search */}
      <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-700">Search Sightings</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Search by bird species or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Sightings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSightings.map((sighting) => {
          const birdDetails = getBirdDetails(sighting.species);
          
          return (
            <Card key={sighting.id} className="bg-white/90 backdrop-blur-sm border-amber-200 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg text-gray-800 mb-1">
                      {sighting.commonName}
                    </CardTitle>
                    {birdDetails && (
                      <p className="text-sm text-gray-600 italic">
                        {birdDetails.scientificName}
                      </p>
                    )}
                  </div>
                  {birdDetails && (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {birdDetails.family}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                {/* Date and Time */}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(sighting.date).toLocaleDateString()} at {sighting.time}
                  </span>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span className="truncate">{sighting.location.address}</span>
                </div>

                {/* Weather */}
                {sighting.weather.condition && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Cloud className="h-4 w-4" />
                    <span>
                      {sighting.weather.condition}, {sighting.weather.temperature}°C
                      {sighting.weather.humidity > 0 && `, ${sighting.weather.humidity}% humidity`}
                    </span>
                  </div>
                )}

                {/* Notes */}
                {sighting.notes && (
                  <div className="pt-2 border-t border-gray-200">
                    <p className="text-sm text-gray-700">{sighting.notes}</p>
                  </div>
                )}

                {/* Habitat Badge */}
                {birdDetails && (
                  <div className="flex flex-wrap gap-1 pt-2">
                    {birdDetails.habitat.map((hab, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {hab}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredSightings.length === 0 && searchTerm && (
        <Card className="bg-white/80 backdrop-blur-sm border-gray-200">
          <CardContent className="p-8 text-center">
            <div className="text-gray-500">
              <h3 className="text-lg font-medium mb-2">No matching sightings</h3>
              <p>Try adjusting your search terms.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SightingsCatalog;
