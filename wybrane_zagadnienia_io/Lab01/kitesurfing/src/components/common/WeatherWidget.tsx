import React from 'react';
import { Wind, Compass, Droplets, Sun, Sparkles } from 'lucide-react';
import { WeatherFixture } from '../../types';

interface WeatherWidgetProps {
  weather: WeatherFixture;
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({ weather }) => {
  return (
    <div className="bg-gradient-to-br from-navy via-navy-light to-navy text-white rounded-2xl p-6 shadow-card border border-navy-700/50 relative overflow-hidden">
      {/* Decorative background kite wave curve */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-ocean/10 rounded-full blur-3xl pointer-events-none transform translate-x-12 -translate-y-12" />
      <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-coral/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header bar */}
      <div className="flex items-center justify-between mb-5 relative z-10">
        <div className="flex items-center gap-2">
          <span className="p-2 bg-ocean/20 text-ocean rounded-xl">
            <Wind size={20} className="animate-pulse" />
          </span>
          <div>
            <h3 className="font-heading font-bold text-base text-white tracking-wide">
              Warunki na Spocie
            </h3>
            <p className="text-xs text-sand-300">{weather.locationLabel}</p>
          </div>
        </div>

        <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-white/10 text-sand-200 border border-white/10 backdrop-blur-sm">
          {weather.updatedAtLabel}
        </span>
      </div>

      {/* Main wind display */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5 relative z-10">
        {/* Wind Speed Main Metric */}
        <div className="sm:col-span-1 bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 flex flex-col justify-between">
          <span className="text-xs font-semibold text-ocean uppercase tracking-wider">
            Prędkość wiatru
          </span>
          <div className="my-1">
            <div className="flex items-baseline gap-1.5">
              <span className="text-4xl font-extrabold font-heading text-white">
                {weather.windKnots}
              </span>
              <span className="text-lg font-bold text-ocean">kts</span>
            </div>
            <div className="text-xs text-sand-300 font-medium">
              {weather.windKmh} km/h (w porywach 25 kts)
            </div>
          </div>
          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mt-2">
            <div 
              className="bg-ocean h-full rounded-full transition-all duration-500" 
              style={{ width: `${Math.min(100, (weather.windKnots / 35) * 100)}%` }} 
            />
          </div>
        </div>

        {/* Direction & Temp */}
        <div className="sm:col-span-2 grid grid-cols-2 gap-3">
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-3.5 border border-white/10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-coral shrink-0">
              <Compass size={20} className="transform rotate-45" />
            </div>
            <div>
              <p className="text-[11px] text-sand-300 font-medium uppercase">Kierunek</p>
              <p className="text-sm font-bold text-white">WNW (295°)</p>
              <p className="text-[10px] text-ocean">Side-onshore (Bezpieczny)</p>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-xl p-3.5 border border-white/10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-amber-300 shrink-0">
              <Sun size={20} />
            </div>
            <div>
              <p className="text-[11px] text-sand-300 font-medium uppercase">Temperatura</p>
              <p className="text-sm font-bold text-white">{weather.temperatureC}°C Powietrze</p>
              <p className="text-[10px] text-sand-300 flex items-center gap-1">
                <Droplets size={10} className="text-ocean" /> {weather.waterTempC}°C Woda (Zatoka)
              </p>
            </div>
          </div>

          {/* Description status banner */}
          <div className="col-span-2 bg-ocean-strong/30 rounded-xl px-3.5 py-2.5 border border-ocean/30 flex items-center gap-2.5">
            <Sparkles size={16} className="text-ocean shrink-0" />
            <p className="text-xs text-sand-100 font-medium leading-relaxed">
              {weather.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
