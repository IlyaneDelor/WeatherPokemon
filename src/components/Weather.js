import React from "react";

class Weather extends React.Component {
    render() {
        return (
            <div className="weather__info">
                {
                    this.props.city && this.props.country && <p className="weather__key">Location:
                        <span className="weather__value"> {this.props.city}, {this.props.country}</span>
                    </p>
                }
                {
                    this.props.temperature && <p className="weather__key">Temperature:
                        <span className="weather__value"> {this.props.temperature}</span>
                    </p>
                }
                {
                    this.props.humidity && <p className="weather__key">Humidity:
                        <span className="weather__value"> {this.props.humidity}</span>
                    </p>
                }
                {
                    this.props.description && <p className="weather__key">Conditions:
                        <span className="weather__value"> {this.props.description}</span>
                    </p>
                }
                {
                    this.props.quote && <p className="weather__key">Quote of the Day:
                        <span className="weather__value"> {this.props.quote}</span>
                    </p>
                }
                {
                    this.props.error && <p className="weather__error">{this.props.error}</p>
                }
                <a href="/pokemon"><button> Pokemon with Weather</button>
                </a>



            </div>
        );
    }
};

export default Weather;

/* Stateless Functional Component (components that don't have state aka app.js wouldnt work as a stateless because it contains a state) would look like this:
Notes: must remove "this", and pass "props" through the function

const Weather (props) => {
    return (
            <div>
                { props.city && props.country && <p>Location: {props.city}, {props.country}</p>}
                { props.temperature && <p>Temperature: {props.temperature}</p>}
                { props.humidity && <p>Humidity: {props.humidity}</p>}
                { props.description && <p>Conditions: {props.description}</p>}
                { props.error && <p>{props.error}</p>}
            </div>
        );
}

export default Weather;

*/