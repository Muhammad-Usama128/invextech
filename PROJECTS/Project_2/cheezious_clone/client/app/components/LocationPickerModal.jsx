"use client";

import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { X, Search, Target, MapPin, ArrowRight } from 'lucide-react';

const libraries = ['places'];

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const defaultCenter = {
  lat: 33.7181, 
  lng: 73.0605,
};

export default function LocationPickerModal({ isOpen, onClose }) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "",
    libraries,
    version: "weekly",
  });

  const [map, setMap] = useState(null);
  const [center, setCenter] = useState(defaultCenter);
  const [isDragging, setIsDragging] = useState(false);
  
  // Views
  const [view, setView] = useState('list'); // 'list' or 'map'
  
  // Addresses
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  
  // Custom Autocomplete State
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);

  // Load saved addresses on open
  useEffect(() => {
    if (isOpen) {
      const existing = JSON.parse(localStorage.getItem("savedAddresses") || "[]");
      setSavedAddresses(existing);
      if (existing.length > 0) {
        setView('list');
        setSelectedAddress(existing[0]);
      } else {
        setView('map');
      }
    }
  }, [isOpen]);

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  // Handle map movement to get the center and update address
  const handleMapIdle = () => {
    setIsDragging(false);
    if (map) {
      const newCenter = map.getCenter();
      const lat = newCenter.lat();
      const lng = newCenter.lng();
      setCenter({ lat, lng });
      reverseGeocode(lat, lng);
    }
  };

  const handleMapDragStart = () => {
    setIsDragging(true);
  };

  const reverseGeocode = (lat, lng) => {
    if (!window.google) return;
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK" && results[0]) {
        setSearchValue(results[0].formatted_address);
      }
    });
  };

  // Custom Autocomplete Fetch
  useEffect(() => {
    if (!isLoaded || !searchValue || view === 'list') {
      setSuggestions([]);
      return;
    }

    let active = true;

    const fetchSuggestions = async () => {
      try {
        if (!window.google?.maps?.places?.AutocompleteSuggestion) {
           return;
        }
        
        const request = { input: searchValue };
        const response = await window.google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions(request);
        
        if (active && response.suggestions) {
          setSuggestions(response.suggestions.map(s => ({
             placeId: s.placePrediction.placeId,
             description: s.placePrediction.text.text,
             prediction: s.placePrediction
          })));
        }
      } catch (e) {
        console.error("Autocomplete error:", e);
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => {
      active = false;
      clearTimeout(timeoutId);
    };
  }, [searchValue, isLoaded, view]);

  const handleSelectSuggestion = async (suggestion) => {
    setSearchValue(suggestion.description);
    setIsSuggestionsOpen(false);
    
    try {
      const place = await suggestion.prediction.toPlace();
      await place.fetchFields({ fields: ['location', 'displayName'] });
      
      const lat = place.location.lat();
      const lng = place.location.lng();
      const pos = { lat, lng };
      
      setCenter(pos);
      if (map) {
        map.panTo(pos);
        map.setZoom(16);
      }
    } catch (e) {
      console.error("Error fetching place details: ", e);
    }
  };

  const handleSelectInputText = () => {
    if (!searchValue) return;
    const existing = JSON.parse(localStorage.getItem("savedAddresses") || "[]");
    
    // Remove if it already exists to avoid duplicates, then unshift
    const filtered = existing.filter(a => a !== searchValue);
    filtered.unshift(searchValue);
    
    localStorage.setItem("savedAddresses", JSON.stringify(filtered));
    setSavedAddresses(filtered);
    
    // Switch to list view and select the new address
    setSelectedAddress(searchValue);
    setView('list');
  };

  if (!isOpen) return null;

  return (
    <div onClick={(e)=>{
      if(e.target === e.currentTarget){
        onClose();
      }
    }} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 font-sans transition-all">
      <div className="w-full max-w-[500px] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col relative transition-all max-h-[90vh] overflow-y-auto">
        
        {view === 'list' && (
          <div className="p-4 sm:p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl sm:text-3xl font-extrabold text-gray-900 mb-2">Saved Addresses</h2>
                <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                  Please allow location for free delivery and good food experience.
                </p>
              </div>
              <button 
                onClick={onClose} 
                className="p-1.5 bg-orange-500 hover:bg-orange-600 rounded-full text-white shrink-0 shadow-sm transition-colors"
              >
                <X size={20} strokeWidth={2.5} />
              </button>
            </div>

            <div className="flex items-center gap-3 mb-8">
              <div 
                className="flex-1 flex items-center bg-gray-50 rounded-xl px-4 py-3 cursor-pointer border border-gray-100 hover:bg-gray-100 transition-colors"
                onClick={() => setView('map')}
              >
                <input 
                  disabled 
                  placeholder="Enter text to search" 
                  className="bg-transparent outline-none flex-1 text-gray-500 pointer-events-none placeholder-gray-400" 
                />
                <Target className="text-orange-500 shrink-0" size={24} />
              </div>
              <button 
                onClick={() => setView('map')} 
                className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-xl flex items-center justify-center transition-colors shrink-0 shadow-sm"
              >
                <ArrowRight size={24} />
              </button>
            </div>

            {savedAddresses.length > 0 && (
              <div>
                <h3 className="font-bold text-gray-900 mb-4 text-lg">Saved Addresses</h3>
                <div className="flex flex-col gap-2 max-h-[160px] sm:max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {savedAddresses.map((addr, idx) => (
                    <label 
                      key={idx} 
                      className="flex items-start gap-4 border-b border-gray-100 pb-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                    >
                      <input 
                        type="radio" 
                        name="address" 
                        className="w-5 h-5 mt-1 accent-gray-600 shrink-0"
                        checked={selectedAddress === addr}
                        onChange={() => setSelectedAddress(addr)}
                      />
                      <div className="flex flex-col">
                        <p className="font-bold text-[15px] text-gray-900 leading-tight">{addr}</p>
                        <p className="text-[13px] text-gray-500 leading-snug mt-1">{addr}</p>
                      </div>
                    </label>
                  ))}
                </div>
                
                <button 
                  onClick={() => {
                    if (selectedAddress) {
                      const existing = JSON.parse(localStorage.getItem("savedAddresses") || "[]");
                      const filtered = existing.filter((a) => a !== selectedAddress);
                      filtered.unshift(selectedAddress);
                      localStorage.setItem("savedAddresses", JSON.stringify(filtered));
                      setSavedAddresses(filtered);
                    }
                    onClose();
                  }}
                  className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-md text-lg"
                >
                  Confirm Selection
                </button>
              </div>
            )}
          </div>
        )}

        {view === 'map' && (
          <div className="relative w-full h-[260px] sm:h-[350px] bg-gray-100">
            {/* Header for map view */}
            <div className="absolute top-0 left-0 w-full z-20 flex justify-end p-4 pointer-events-none">
              <button 
                onClick={onClose}
                className="p-1.5 bg-orange-500 hover:bg-orange-600 rounded-full text-white shadow-md transition-colors pointer-events-auto"
              >
                <X size={20} strokeWidth={2.5} />
              </button>
            </div>

            {loadError && (
               <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-red-500 p-4 text-center">
                 Error loading Google Maps. Please check your API key.
               </div>
            )}
            {!isLoaded ? (
               <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500">
                 Loading map...
               </div>
            ) : (
              <>
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={center}
                  zoom={15}
                  onLoad={onLoad}
                  onUnmount={onUnmount}
                  onIdle={handleMapIdle}
                  onDragStart={handleMapDragStart}
                  options={{
                    disableDefaultUI: true,
                    zoomControl: true,
                    zoomControlOptions: {
                      position: window.google?.maps?.ControlPosition?.LEFT_TOP,
                    },
                  }}
                >
                  {/* Fixed Center Pin */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 flex flex-col items-center">
                    <div className={`transition-transform duration-200 ${isDragging ? '-translate-y-4' : 'translate-y-0'}`}>
                      <MapPin size={40} className="text-red-600 fill-red-600 stroke-white stroke-2" />
                    </div>
                    {/* Subtle shadow below pin */}
                    <div className="w-4 h-1.5 bg-black/20 rounded-[100%] mt-1 shadow-sm"></div>
                  </div>
                </GoogleMap>

                {/* Overlay Controls */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-full max-w-[90%] px-4 flex gap-2 z-20 pt-10">
                  {/* Search Box */}
                  <div className="relative flex-1">
                    <input
                      value={searchValue}
                      onChange={(e) => {
                        setSearchValue(e.target.value);
                        setIsSuggestionsOpen(true);
                      }}
                      onFocus={() => setIsSuggestionsOpen(true)}
                      placeholder="Enter text to search"
                      className="w-full h-12 pl-4 pr-10 rounded-xl shadow-lg border-0 focus:ring-2 focus:ring-orange-500 outline-none text-gray-700 text-lg bg-white"
                    />
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={24} />
                    
                    {/* Autocomplete Suggestions */}
                    {isSuggestionsOpen && suggestions.length > 0 && (
                      <ul className="absolute top-full left-0 w-full bg-white mt-2 rounded-xl shadow-xl overflow-hidden z-30 max-h-48 overflow-y-auto">
                        {suggestions.map((suggestion) => (
                          <li
                            key={suggestion.placeId}
                            className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-sm text-gray-700 border-b border-gray-100 last:border-0"
                            onClick={() => handleSelectSuggestion(suggestion)}
                          >
                            {suggestion.description}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Select Button */}
                  <button
                    onClick={handleSelectInputText}
                    className="px-6 h-12 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg transition-colors shrink-0"
                  >
                    Select
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
