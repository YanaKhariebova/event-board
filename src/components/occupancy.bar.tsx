type OccupancyBarProps = {
  attendees: number; // wie viele Teilnehmer aktuell da sind (число — сколько участников сейчас)
  maxAttendees: number; // wie viele maximal erlaubt sind (число — максимум допустимых мест)
};

export function OccupancyBar({ attendees, maxAttendees }: OccupancyBarProps) {
  // Berechnet den Prozentsatz der Auslastung
  // Schutz vor Division durch 0, falls maxAttendees = 0 wäre
  const occupancy = maxAttendees > 0 ? (attendees / maxAttendees) * 100 : 0;

  // Rundet die Zahl, damit z.B. "50%" statt "50.3333%" angezeigt wird
  const roundedOccupancy = Math.round(occupancy);

  // true, wenn das Event voll ist (100% oder mehr) — für die rote Farbe
  const isFull = occupancy >= 100;

  return (
    <div className="w-full space-y-1">
      {/* Zeigt z.B. "Attendees: 8 / 16" */}
      <p className="text-sm">
        Attendees: {attendees} / {maxAttendees}
      </p>

      {/* Zeigt z.B. Occupancy: 50% */}
      <p className="text-sm">Occupancy: {roundedOccupancy}%</p>

      {/* Äußerer Balken — der graue Hintergrund (immer 100% breit) */}
      <div className="w-full bg-gray-200 rounded-full h-4">
        {/* Innerer Balken — die farbige Füllung, Breite = Prozentsatz */}
        <div
          className={`h-4 rounded-full ${isFull ? "bg-red-500" : "bg-green-500"}`}
          style={{ width: `${Math.min(occupancy, 100)}%` }}
          // Math.min(...) verhindert, dass der Balken über 100% hinausgeht
        ></div>
      </div>
    </div>
  );
}
