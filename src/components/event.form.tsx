import { useState } from "react";
import type { EventFormValues } from "../types/event";

// Props der Komponente:
// initialValues ist optional — bei "Erstellen" leer, bei "Bearbeiten" mit vorhandenen Daten gefüllt
// onSubmit wird aufgerufen, wenn das Formular abgeschickt wird
// submitLabel ist der Text auf dem Button (z.B. "Create" oder "Save Changes")
type EventFormProps = {
  initialValues?: EventFormValues;
  onSubmit: (values: EventFormValues) => void;
  submitLabel: string;
};

type FormErrors = Partial<Record<keyof EventFormValues, string>>;

export function EventForm({
  initialValues,
  onSubmit,
  submitLabel,
}: EventFormProps) {
  // State für alle Formularfelder zusammen in einem Objekt
  // ?? bedeutet: wenn initialValues nicht übergeben wurde, nutze die leeren Standardwerte
  const [values, setValues] = useState<EventFormValues>(
    initialValues ?? {
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      category: "workshop",
      status: "draft",
      maxAttendees: 1,
    },
  );
  const [errors, setErrors] = useState<FormErrors>({});

  // aktualisiert genau EIN Feld im values-Objekt, ohne die anderen Felder zu verändern
  // field ist der Name des Feldes (z.B. "title"), value ist der neue Wert
  // keyof EventFormValues bedeutet: field darf nur ein echter Feldname aus EventFormValues sein
  function handleChange(field: keyof EventFormValues, value: string | number) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  // prüft alle Felder und gibt ein Objekt mit Fehlermeldungen zurück
  // wenn ein Feld leer ist (oder maxAttendees <= 0), wird ein Fehlertext eingetragen
  function validate(values: EventFormValues): FormErrors {
    const newErrors: FormErrors = {};

    if (!values.title.trim()) {
      newErrors.title = "Title darf nicht leer sein";
    }
    if (!values.description.trim()) {
      newErrors.description = "Beschreibung darf nicht leer sein";
    }
    if (!values.date) {
      newErrors.date = "Datum darf nicht leer sein";
    }
    if (!values.time) {
      newErrors.time = "Uhrzeit darf nicht leer sein";
    }
    if (!values.location.trim()) {
      newErrors.location = "Ort darf nicht leer sein";
    }
    if (values.maxAttendees <= 0) {
      newErrors.maxAttendees = "Maximale Teilnehmerzahl muss größer als 0 sein";
    }

    return newErrors;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        const newErrors = validate(values);
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
          onSubmit(values);
        }
      }}
      className="space-y-4 max-w-xl"
    >
      {/* Titel */}
      <div>
        <label className="label">Title</label>
        <input
          type="text"
          value={values.title}
          onChange={(e) => handleChange("title", e.target.value)}
          className="input input-bordered w-full"
        />
        {errors.title && (
          <p className="text-error text-sm mt-1">{errors.title}</p>
        )}
      </div>

      {/* Beschreibung */}
      <div>
        <label className="label">Description</label>
        <textarea
          value={values.description}
          onChange={(e) => handleChange("description", e.target.value)}
          className="textarea textarea-bordered w-full"
        />
        {errors.description && (
          <p className="text-error text-sm mt-1">{errors.description}</p>
        )}
      </div>

      {/* Datum */}
      <div>
        <label className="label">Date</label>
        <input
          type="date"
          value={values.date}
          onChange={(e) => handleChange("date", e.target.value)}
          className="input input-bordered w-full"
        />
        {errors.date && (
          <p className="text-error text-sm mt-1">{errors.date}</p>
        )}
      </div>
      {/* Uhrzeit */}
      <div>
        <label className="label">Time</label>
        <input
          type="time"
          value={values.time}
          onChange={(e) => handleChange("time", e.target.value)}
          className="input input-bordered w-full"
        />
        {errors.time && (
          <p className="text-error text-sm mt-1">{errors.time}</p>
        )}
      </div>
      {/* Ort */}
      <div>
        <label className="label">Location</label>
        <input
          type="text"
          value={values.location}
          onChange={(e) => handleChange("location", e.target.value)}
          className="input input-bordered w-full"
        />
        {errors.location && (
          <p className="text-error text-sm mt-1">{errors.location}</p>
        )}
      </div>
      {/* Kategorie */}
      <div>
        <label className="label">Category</label>
        <select
          value={values.category}
          onChange={(e) => handleChange("category", e.target.value)}
          className="select select-bordered w-full"
        >
          <option value="workshop">Workshop</option>
          <option value="talk">Talk</option>
          <option value="networking">Networking</option>
          <option value="review">Review</option>
          <option value="other">Other</option>
        </select>
        {errors.category && (
          <p className="text-error text-sm mt-1">{errors.category}</p>
        )}
      </div>
      {/* Status */}
      <div>
        <label className="label">Status</label>
        <select
          value={values.status}
          onChange={(e) => handleChange("status", e.target.value)}
          className="select select-bordered w-full"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="cancelled">Cancelled</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      {/* Maximale Teilnehmerzahl */}
      <div>
        <label className="label">Max Attendees</label>
        <input
          type="number"
          value={values.maxAttendees}
          onChange={(e) => handleChange("maxAttendees", Number(e.target.value))}
          className="input input-bordered w-full"
        />
        {errors.maxAttendees && (
          <p className="text-error text-sm mt-1">{errors.maxAttendees}</p>
        )}
      </div>

      {/* Submit Button */}
      <button type="submit" className="btn btn-primary">
        {submitLabel}
      </button>
    </form>
  );
}
