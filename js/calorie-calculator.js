// Calorie Calculator functionality
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('calorieForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            calculateCalories();
        });
    }
});

function calculateCalories() {
    // Get form values
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseInt(document.getElementById('height').value);
    const activity = parseFloat(document.getElementById('activity').value);
    const goal = document.getElementById('goal').value;

    // Validate inputs
    if (!age || !gender || !weight || !height || !activity || !goal) {
        alert('Please fill in all fields');
        return;
    }

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr;
    if (gender === 'male') {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }

    // Calculate maintenance calories (TDEE)
    const maintenance = bmr * activity;

    // Calculate recommended calories based on goal
    let recommended;
    let goalDescription;

    switch(goal) {
        case 'lose':
            recommended = maintenance - 500; // 500 calorie deficit for weight loss
            goalDescription = 'For weight loss (approx. 0.5kg per week)';
            break;
        case 'maintain':
            recommended = maintenance;
            goalDescription = 'To maintain your current weight';
            break;
        case 'gain':
            recommended = maintenance + 500; // 500 calorie surplus for weight gain
            goalDescription = 'For weight gain (approx. 0.5kg per week)';
            break;
        default:
            recommended = maintenance;
            goalDescription = 'Based on your selected goal';
    }

    // Display results
    document.getElementById('bmr').textContent = Math.round(bmr) + ' kcal/day';
    document.getElementById('maintenance').textContent = Math.round(maintenance) + ' kcal/day';
    document.getElementById('recommended').textContent = Math.round(recommended) + ' kcal/day';
    document.getElementById('goalDescription').textContent = goalDescription;

    // Show results section
    document.getElementById('results').classList.add('show');

    // Smooth scroll to results
    document.getElementById('results').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'nearest' 
    });
}
