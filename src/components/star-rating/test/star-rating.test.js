import React from 'react';
import { shallow } from 'enzyme';
import StarRating from '../';
import { expect } from 'chai';

describe('<StarRating /> Component', () => {
  const wrapper = shallow(<StarRating starRating={3} maxRating={5} ratingIconUrl={''}/>);
  const children = wrapper.children().nodes;
  it('should render our StarRating component', function (done) {
    expect(children.length).to.deep.equal(5);
    done();
  });
  it('it should display the correct number of highlighted and unhighlighted icons', (done) => {
    const wrapper = shallow(<StarRating starRating={3} maxRating={5} ratingIconUrl={''}/>);
    expect(wrapper.find('.ratingIcon').length).to.equal(3);
    expect(wrapper.find('.ratingIconBlur').length).to.equal(2);
    done();
  });
  it('can only display highlighted icons up to a max rating value (passed in as a prop or default)', (done) => {
    const wrapper = shallow(<StarRating starRating={8} maxRating={5} ratingIconUrl={''}/>);
    expect(wrapper.find('.ratingIcon').length).to.equal(5);
    expect(wrapper.find('.ratingIconBlur').length).to.equal(0);
    done();
  });
  it('should have props for starRating, maxRating and ratingIconUrl', function (done) {
    expect(wrapper.props().starRating).to.be.defined;
    expect(wrapper.props().maxRating).to.be.defined;
    expect(wrapper.props().ratingIconUrl).to.be.defined;
    done();
  });
});
