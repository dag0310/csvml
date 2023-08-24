import { describe, it } from 'mocha';
import { expect } from 'chai';
import Csvml from '../src/csvml.js';

describe('Csvml', () => {
  it('should parse correctly', () => {
    // given
    const input = `command,shutters_seconds
time,lat,lon

shutters_down,10
sunset,47.076668,15.421371

#shutters_up
09:00

#light_on
03:40

light_off
23:00

#shutters_down,2
    14:30`;

    // when
    const output = new Csvml().parse(input);

    // then
    expect(JSON.stringify(output)).to.equal(JSON.stringify([
      {
        command: 'shutters_down',
        shutters_seconds: 10,
        time: 'sunset',
        lat: 47.076668,
        lon: 15.421371,
      },
      {
        command: 'light_off',
        time: '23:00',
      }
    ]));
  });
});
