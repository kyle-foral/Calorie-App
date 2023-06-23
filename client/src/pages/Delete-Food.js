export default function deleteFood(foodId) {
  async function removeData() {
    try {
      const res = await fetch(`/api/meal/${foodId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        throw new Error('Network response was not ok', res.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  removeData();
}
