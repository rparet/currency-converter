import React from "react";
import { Select } from "@chakra-ui/core";


// create a component that renders a select input for coutries
// TODO: these are sorted by country.code, which is often not alphabetical
// for example: KRW = South Korea, so it shows up in the Ks.
// Fix them to sort alphabetically.

class CountrySelect extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
      this.props.onCountryChange(e.target.value);
    }
  
    render() {
      const country = this.props.country;
  
      return (
        <Select value={country} onChange={this.handleChange}>
          {this.props.data.countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name} {country.emoji}
            </option>
          ))}
        </Select>
      );
    }
  }

export default CountrySelect
