const getCurrentValue = () => Number(document.querySelector('#result').innerHTML);

const setNewValue = value => {
    document.querySelector('#result').innerHTML = value;
};

document.querySelector('#minus').addEventListener('click', () => {
    const currentValue = getCurrentValue();
    if (currentValue > 1) {
        setNewValue(currentValue - 1);
    }
});

document.querySelector('#plus').addEventListener('click', () => {
    const currentValue = getCurrentValue();
    setNewValue(currentValue + 1);
});