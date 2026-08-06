import { onGridDefaults } from './products/onGridDefaults';
import { hybridDefaults } from './products/hybridDefaults';
import { offGridDefaults } from './products/offGridDefaults';
import { waterHeatersDefaults } from './products/waterHeatersDefaults';
import { lithiumUpsDefaults } from './products/lithiumUpsDefaults';
import { homeUpsDefaults } from './products/homeUpsDefaults';
import { invertersDefaults } from './products/invertersDefaults';
import { onlineUpsDefaults } from './products/onlineUpsDefaults';
import { lithiumBatteriesDefaults } from './products/lithiumBatteriesDefaults';
import { tubularBatteriesDefaults } from './products/tubularBatteriesDefaults';

export const productDefaults: Record<string, any> = {
  'on-grid': onGridDefaults,
  'hybrid': hybridDefaults,
  'off-grid': offGridDefaults,
  'water-heaters': waterHeatersDefaults,
  'lithium-ups': lithiumUpsDefaults,
  'home-ups': homeUpsDefaults,
  'inverters': invertersDefaults,
  'online-ups': onlineUpsDefaults,
  'lithium-batteries': lithiumBatteriesDefaults,
  'tubular-batteries': tubularBatteriesDefaults,
};
