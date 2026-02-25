document.getElementById('calorie-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const activity = parseFloat(document.getElementById('activity').value);

    let bmr;
    if (gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    const maintenanceCalories = bmr * activity;
    const gainCalories = maintenanceCalories + 7700 / 7; // Gain 1kg in a week
    const loseCalories = maintenanceCalories - 7700 / 7; // Lose 1kg in a week

    document.getElementById('maintenance-calories').textContent = `Maintenance Calories: ${maintenanceCalories.toFixed(2)} kcal`;
    document.getElementById('gain-calories').textContent = `Calories to Gain 1kg: ${gainCalories.toFixed(2)} kcal`;
    document.getElementById('lose-calories').textContent = `Calories to Lose 1kg: ${loseCalories.toFixed(2)} kcal`;
});
