import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount } from 'enzyme';
import App from '../App';
import Event from '../Event';
import { mockData } from '../mock-data';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {

  let AppWrapper;
  test('An event element is collapsed by default.',
    ({ given, when, then }) => {
      given('the user opens the app', () => { });

      when('the user see a list of all upcoming events (with show details button)', () => {
        AppWrapper = mount(<App />);
      });

      then('the user should see a each list is collapsed by default', () => {
        AppWrapper.update();
        expect(AppWrapper.find('.event.description')).toHaveLength(0);
      });
    }
  );


  test('User can expand an event to see its details.',
    ({ given, when, then }) => {
      given('the user see an event element with show deatils button', () => {
        AppWrapper = mount(<App />);
      });

      when('the user clicks on show details button', () => {
        AppWrapper.update();
        AppWrapper.find('.event .event-showDetails-btn').at(0).simulate('click');
      });

      then('the user should see the expanded event element with hide details button', () => {
        expect(AppWrapper.find('.event .event-description')).toHaveLength(1);
      });
    }
  );

  test('User can collapse an event to hide its details.',
    ({ given,
      when,
      then
    }) => {
      given('the users see a expanded event element with hide details button', async () => {
        AppWrapper = await mount(<App />);
        AppWrapper.update();
        AppWrapper.find('.event .event-showDetails-btn').at(0).simulate("click");
      });

      when('the user click on hide deatils button', () => {
        AppWrapper.update();
        AppWrapper.find('.event .event-hideDetails-btn').at(0).simulate("click");
      });

      then('the user should see the collaped event element with show details button', () => {
        expect(AppWrapper.find('.event .event-description')).toHaveLength(0);
      });
    }
  );

});