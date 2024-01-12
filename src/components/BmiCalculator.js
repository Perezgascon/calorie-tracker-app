import React, { useState } from 'react';
import Button from './Button';
import Footer from './Footer'

import styles from './BmiCalculator.module.css';

export default function BmiCalculator() {
    const [bmiVis, setBmiVis] = useState(false);
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [bmi, setBmi] = useState(0);
    const [bmiCategory, setBmiCategory] = useState('');


    const calcBmi = () => {
        const heightValue = parseFloat(height);
        const weightValue = parseFloat(weight);

        if (!isNaN(heightValue) && !isNaN(weightValue)) {
            const calculatedBmi = Math.round(weightValue / (heightValue * heightValue));
            setBmi(calculatedBmi);

            // Determine BMI category
            if (calculatedBmi < 18.5) {
                setBmiCategory('Underweight');
            } else if (calculatedBmi >= 18.5 && calculatedBmi <= 25) {
                setBmiCategory('Normal');
            } else if (calculatedBmi >= 25 && calculatedBmi <= 30) {
                setBmiCategory('Overweight');
            } else {
                setBmiCategory('Obese');
            }

            setBmiVis(true);
        } else {
            // Handle invalid input (non-numeric or empty)
            setBmiCategory('');
            setBmiVis(false);
            setBmi(0);
        }
    }

    return (
        <div className={styles.mainContainer}>
            <h1>BMI Calculator</h1>
            <div className={styles.fieldsContainer}>
                <div className={styles.traitField}>
                    <p>Age: </p><input
                        className={styles.inputField}
                        type="text" />
                </div>
                <div className={styles.traitField}>
                    <p>Gender: </p>
                    <input
                        type="checkbox"
                        name="gender"
                        value="male" /> <span>Male</span>
                    <input type="checkbox" name="gender" value="female" /> <span>Female</span>
                </div>
                <div className={styles.traitField}>
                    <p>Height: </p>
                    <input
                        className={styles.inputField}
                        type='text'
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        placeholder='m' />
                </div>
                <div className={styles.traitField}>
                    <p>Weight: </p>
                    <input
                        className={styles.inputField}
                        type='text'
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder='kg' />
                </div>
            </div>
            <Button handleButtonClick={calcBmi} text={"Calculate"} />
            {bmiVis && (
                <>
                    <p>Your BMI is: {bmi}</p>
                    {/* Add logic to determine and display BMI category */}
                    <p>You are {bmiCategory}</p>
                </>

            )}
            <div className={styles.footer}>
                <Footer />
            </div>
        </div>
    );
}
