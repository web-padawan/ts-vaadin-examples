import { LitElement, html } from 'lit';
import { property, query } from 'lit/decorators.js';
import '@vaadin/vaadin-charts/vaadin-chart.js';
import type { ChartElement } from '@vaadin/vaadin-charts';

type Country = { name: { common: string }; population: number };

class ChartConfigurationDemo extends LitElement {
  @property({ type: Array }) categories: string[] = [];

  @query('vaadin-chart')
  private chart!: ChartElement;

  render() {
    return html`
      <vaadin-chart
        title="Top countries by population"
        .categories="${this.categories}"
        .additionalOptions="${this.chartOptions}"
      ></vaadin-chart>
    `;
  }

  get endpoint() {
    return 'https://restcountries.com/v3.1';
  }

  get chartOptions() {
    return { yAxis: { title: { text: 'Population' } } };
  }

  firstUpdated() {
    fetch(`${this.endpoint}/all?fields=name,population`)
      .then((r) => r.json())
      .then((data) => this.initChart(data));
  }

  initChart(data: Country[]) {
    const countries = this.getTopCountries(data);
    this.categories = this.getCategories(countries);
    this._addSeries(this.chart, this.getPopulation(countries));
  }

  getCategories(countries: Country[]) {
    return countries.map((country) => country.name.common);
  }

  getPopulation(countries: Country[]) {
    return countries.map((country) => country.population);
  }

  getTopCountries(countries: Country[]) {
    return countries.sort((a, b) => (a.population > b.population ? -1 : 1)).slice(0, 10);
  }

  _addSeries(chart: ChartElement, population: number[]) {
    if (chart.configuration) {
      chart.configuration.addSeries({
        type: 'column',
        showInLegend: false,
        data: population
      });
    }
  }
}

customElements.define('chart-configuration-demo', ChartConfigurationDemo);
