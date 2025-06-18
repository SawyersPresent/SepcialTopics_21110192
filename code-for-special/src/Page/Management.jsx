import { useEffect, useState } from 'react';

function Management() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    event_date: '',
    event_time: '',
    price: ''
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/api/events');
      if (!response.ok) throw new Error('Failed to fetch events');
      const eventsData = await response.json();
      setEvents(eventsData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Failed to load events');
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      event_date: '',
      event_time: '',
      price: ''
    });
    setEditingEvent(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const method = editingEvent ? 'PUT' : 'POST';
      const url = editingEvent 
        ? `http://localhost:3001/api/events/${editingEvent.id}`
        : 'http://localhost:3001/api/events';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to save event');

      resetForm();
      fetchEvents();
    } catch (error) {
      console.error('Error saving event:', error);
      setError('Failed to save event');
    }
  };

  const handleEdit = (event) => {
    setFormData({
      name: event.name,
      event_date: event.event_date,
      event_time: event.event_time,
      price: event.price
    });
    setEditingEvent(event);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;

    try {
      const response = await fetch(`http://localhost:3001/api/events/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete event');

      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
      setError('Failed to delete event');
    }
  };

  if (loading) return <div>Loading events...</div>;

  return (
    <div>
      <h1>Event Management</h1>
      
      {error && <div>{error}</div>}
      
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : 'Add New Event'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit}>
          <h3>{editingEvent ? 'Edit Event' : 'Add New Event'}</h3>
          
          <div>
            <label>Event Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label>Date:</label>
            <input
              type="date"
              name="event_date"
              value={formData.event_date}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label>Time:</label>
            <input
              type="time"
              name="event_time"
              value={formData.event_time}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              step="0.01"
              min="0"
              required
            />
          </div>

          <button type="submit">
            {editingEvent ? 'Update Event' : 'Create Event'}
          </button>
          <button type="button" onClick={resetForm}>
            Cancel
          </button>
        </form>
      )}

      <h2>Events List</h2>
      {events.length === 0 ? (
        <p>No events found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event => (
              <tr key={event.id}>
                <td>{event.id}</td>
                <td>{event.name}</td>
                <td>{event.event_date}</td>
                <td>{event.event_time}</td>
                <td>₱{parseFloat(event.price).toLocaleString()}</td>
                <td>
                  <button onClick={() => handleEdit(event)}>Edit</button>
                  <button onClick={() => handleDelete(event.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Management;