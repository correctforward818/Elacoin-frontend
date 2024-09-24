import React, { useCallback, useState } from 'react';
import ReactDOM from 'react-dom/client';

const BoilingVerdict = (props) => {
    if(props.celsius >= 100) {
        return <p>The water would boil</p>
    }
    else {
        return <p>The water would not boil</p>
    }
}


const Calculator = () => {
    const [temperature, setTemperature] = useState('');
    const [scale, setScale] = useState('c');
    const handleCelsiusChange = useCallback((temperature) => {
        setScale('c');
        setTemperature(temperature);
    }, []);
    const handleFahrenheitChange = useCallback((temperature) => {
        setScale('f');
        setTemperature(temperature);
    }, []);

    const celsiusTemperature = scale === 'f' ? tryConverter(temperature, toCelsius) : temperature;
    const fahrenheitTemperature = scale === 'c' ? tryConverter(temperature, toFahrenheit) : temperature;

    return (
        <div>
            <TemperaturInput 
                scale="c"
                temperature={celsiusTemperature}
                onTemperatureChange={handleCelsiusChange} 
            />

            <TemperaturInput 
                scale="f"
                temperature={fahrenheitTemperature}
                onTemperatureChange={handleFahrenheitChange}
            />

            <BoilingVerdict 
                celsius={parseFloat(celsiusTemperature)}
            />
        </div>
    );
}
// class Calculator extends React.Component {
//     constructor(props) {
//         super(props);
//         this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
//         this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
//         this.state = {temperature: '', scale: 'C'};
//     }

//      handleCelsiusChange = (temperature) => {
//         this.setState({scale: 'c', temperature});
//     }

//     handleFahrenheitChange = (temperature) => {
//         this.setState({scale: 'f', temperature})
//     }

//     render() {
//         const scale = this.state.scale;
//         const temperature = this.state.temperature;
//         const celsiusTemperature = scale === 'f' ? tryConverter(temperature, toCelsius) : temperature;
//         const fahrenheitTemperature = scale === 'c' ? tryConverter(temperature, toFahrenheit) : temperature;
//         return (
//             <div>
//                 <TemperaturInput 
//                     scale="c"
//                     temperature={celsiusTemperature}
//                     onTemperatureChange={this.handleCelsiusChange} />

//                 <TemperaturInput 
//                     scale="f"
//                     temperature={fahrenheitTemperature}
//                     onTemperatureChange={this.handleFahrenheitChange} />

//                 <BoilingVerdict 
//                     celsius={parseFloat(celsiusTemperature)}/>
//             </div>
//         ); 
//     }
// }

const scaleNames = {
    c: "Celsius",
    f: "Fahrenheit"
};


const TemperaturInput = (props) => {
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
// class TemperaturInput extends React.Component {
//     constructor(props) {
//         super(props);
//         this.handlechange = this.handlechange.bind(this);
//         this.state = {temperature: ''};
//     }

//     handlechange = (e) => {
//         // this.setState({temperature: e.target.value});
//         this.props.onTemperatureChange(e.target.value);
//     }

//     render() {
//         const temperature = this.props.temperature;
//         const scale = this.props.scale;
//         return(
//             <fieldset>
//                 <legend>Enter temperature in {scaleNames[scale]}</legend>
//                 <input 
//                     value={temperature}
//                     onChange={this.handlechange}
//                 />
//             </fieldset>
//         );
//     }
// }

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

const posts = [
    {id: 1, title: "Hello world!", content: "Welcome to learning React!" },
    {id: 2, title: "Installation", content: "You can install React from npm"}
]
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Calculator />);