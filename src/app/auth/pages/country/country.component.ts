import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../services/country.service'; // Asegúrate de que el servicio esté bien importado
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  countries: Country[] = [];
  filteredCountries: Country[] = [];
  searchTerm: string = '';
  selectedCountry: Country | null = null;  // Para almacenar el país seleccionado

  constructor(private countryService: CountryService) { }

  ngOnInit(): void {
    this.countryService.getAllCountries().subscribe((data: Country[]) => {
        this.countries = data.map(country => ({
          ...country,
          languagesString: country.languages ? Object.values(country.languages).join(', ') : 'No disponible'  // Manejo de undefined
        }));
        this.filteredCountries = this.countries;
      });
    }

  filterCountries(): void {
    this.filteredCountries = this.countries.filter(country =>
      country.name.common.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  selectCountry(country: Country): void {
    this.selectedCountry = country;  // Asigna el país seleccionado
  }
}
