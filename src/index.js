import React, { useCallback, useState } from 'react';
import ReactDOM from 'react-dom/client';

const BoilingVerdict = (props) => {
    if(props.celsius >= 100) {
        return <p>The water would boil at {props.celsius === 101 ? 90 : props.celsius}</p>
    }
    else {
        return <p>The water would not boil at {props.celsius}</p>
    }



}


const Calculator = () => {
    const [temperature, setTemperature] = useState('');
    const [scale, setScale] = useState('c');
    const handleCelsiusChange = (temperature) => {
        setScale('c');
        setTemperature(temperature);
    }

    const handleFahrenheitChange = (temperature) => {
        setScale('f');
        setTemperature(temperature);
    }

    const celsiusTemperature = scale === 'f' ? tryConverter(temperature, toCelsius) : temperature;
    const fahrenheitTemperature = scale === 'c' ? tryConverter(temperature, toFahrenheit) : temperature;

    return (
        <div>
            <TemperatureInput 
                scale="c"
                temperature={celsiusTemperature}
                onTemperatureChange={handleCelsiusChange} 
            />

            <TemperatureInput 
                scale="f"
                temperature={fahrenheitTemperature}
                onTemperatureChange={handleFahrenheitChange}
            />

            <BoilingVerdict 
                celsius={parseFloat(celsiusTemperature)}
            />

            <WelcomeDialog />
        </div>
    );
}

const scaleNames = {
    c: "Celsius",
    f: "Fahrenheit"
};


const TemperatureInput = (props) => {
    const handlechange = (e) => {
        props.onTemperatureChange(e.target.value);
    }
    const temperature = props.temperature;  
    const scale = props.scale;
    return (
        <fieldset>
            <legend>Enter temperature in {scaleNames[scale]}</legend>
            <input
                value={temperature}
                onChange={handlechange}
            />
        </fieldset> 
    );
}

const toCelsius = (fahrenheit) => {
    return (fahrenheit - 32) * 5 / 9;
}

const toFahrenheit = (celsius) => {
    return (celsius * 9 / 5) + 32;
}

const tryConverter = (temperature, convert) => {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
        return '';
    }
    
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}
const Blog = (props) => {
    const sideBar = (
        <ul>
            {props.posts.map((post) => 
                <li key={post.id}>
                    {post.title}
                </li>
            )}
        </ul>
    );

    const content = props.posts.map((post) => 
        <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
        </div>
    );
    return(
        <div>
            {sideBar}
            <br />
            {content}
        </div>
    );
}

const FancyBorder = (props) => {
    return (
        <div className={'FancyBorder + FancyBorder-' + props.color}>
            {props.children}
        </div>
    );
}

const WelcomeDialog = () => {
    return (
        <FancyBorder color="blue">
            <h1 className='Dialog-title'>
                Welcome
            </h1>
            <p>
                Thank you.
            </p>
        </FancyBorder>
    );
}

const posts = [
    {id: 1, title: "Hello world!", content: "Welcome to learning React!" },
    {id: 2, title: "Installation", content: "You can install React from npm"}
]

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Calculator />);