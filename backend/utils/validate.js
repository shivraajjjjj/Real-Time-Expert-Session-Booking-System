// Email validation
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Phone validation (10-15 digits)
const isValidPhone = (phone) => {
    const phoneRegex = /^\d{10,15}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
};

// Name validation (not empty, at least 2 characters)
const isValidName = (name) => {
    return name && name.trim().length >= 2;
};

// Date validation (ISO format: YYYY-MM-DD)
const isValidDate = (date) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) return false;
    const dateObj = new Date(date);
    return dateObj instanceof Date && !isNaN(dateObj);
};

// Time slot validation (HH:MM format)
const isValidTimeSlot = (timeSlot) => {
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return timeRegex.test(timeSlot);
};

// Notes validation (max 500 characters)
const isValidNotes = (notes) => {
    if (!notes) return true; // optional field
    return notes.trim().length <= 500;
};

module.exports = {
    isValidEmail,
    isValidPhone,
    isValidName,
    isValidDate,
    isValidTimeSlot,
    isValidNotes
};
