import WeatherCurrent from './current.types';
import WeatherForecast from './forecast.types';
import WeatherLocation from './location.types';

export default interface Weather {
  location: WeatherLocation;
  current: WeatherCurrent;
  forecast: WeatherForecast;
}
