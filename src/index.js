import React, { Fragment, useCallback, useContext, useEffect, useRef, useState } from 'react';
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
    const ref = React.createRef();

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

            <OuterClickExample />

            <Test />

            <FancyButton ref={ref}>Click me!</FancyButton>

            <TestButton />

            <HookExample />
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

const ListItem = (item) => {
    return(
        <Fragment>
            <dt>{item.term}</dt>
            <dd>{item.description}</dd>
        </Fragment>
    );
}


const Glossary = (props) => {
    return(
      <dl>
        {props.items.map(item => (
            <ListItem item={item} key={item.id} />
        ))}
      </dl>  
    );
}

const OuterClickExample = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleContainer = useRef(null);
    
    const onClickHandler = () => {
        setIsOpen(prevState => !prevState);
    }

    const onClickOutsideHandler = (e) => {
        if (isOpen && toggleContainer.current && !toggleContainer.current.contains(e.target)) {
            setIsOpen(false);
        }
    } 

    useEffect(() => {
        window.addEventListener('click', onClickOutsideHandler);
        return () => {
            window.removeEventListener('click', onClickOutsideHandler);
        };
    }, [isOpen]);

    return (
        <div ref={toggleContainer}>
            <button onClick={onClickHandler}>Select an Option</button>
            {isOpen && (
                <ul>
                    <li>Option 1</li>
                    <li>Option 2</li>
                    <li>Option 3</li>
                </ul>
            )}
        </div>
    );
};

const ThemeContext = React.createContext('light');

const Test = () => {
    return (
        <ThemeContext.Provider value='dark'>
            <ToolBar />
        </ThemeContext.Provider>
    );
}

const ToolBar = () => {
    return (
        <div>
            <ThemeButton />
        </div>
    );
}

const ThemeButton = () => {
    const theme = useContext(ThemeContext);
    return <button theme={theme} />
}

const FancyButton = React.forwardRef((props, ref) => {
    <button ref={ref} className='FancyButton'>
        {props.children}But note that the USP of this is no longer what we set out it would be.
    </button>
});

const Button = (props) => {
    const {kind, ...other} = props;
    const className = 'primary' ? "PrimaryButton" : "SecondaryButton";
    return <button className='className' {...other} />
}

const TestButton = (props) => {
    return (
        <div>
            <Button kind="primary" onClick={() => console.log('clicked')} />
        </div>
    );
}

const HookExample = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        document.title = `You clicked ${count} times`;
    })

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>Click me</button>
        </div>
    );
}

const posts = [
    {id: 1, title: "Hello world!", content: "Welcome to learning React!" },
    {id: 2, title: "Installation", content: "You can install React from npm"}
]

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Calculator />);