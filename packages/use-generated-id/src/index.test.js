// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import TestRenderer from 'react-test-renderer';

import useGeneratedId from '.';

describe('useGeneratedId', () => {
  const ComponentUsingId = (props) => {
    const { children, id, ...otherProps } = props;

    const generatedId = useGeneratedId(id);

    return (
      <div id={generatedId} {...otherProps}>
        {children}
      </div>
    );
  };

  it('should use a generated ID if no ID argument is supplied', () => {
    const component = TestRenderer.create(
      <ComponentUsingId>Hello</ComponentUsingId>,
    );

    expect(component.toJSON().props.id).toBeDefined();
    expect(component.toJSON().props.id).toHaveLength(9);
  });

  it('should use a supplied ID', () => {
    const component = TestRenderer.create(
      <ComponentUsingId id="my-id">Hello</ComponentUsingId>,
    );

    expect(component.toJSON().props.id).toEqual('my-id');
  });

  it('should use the same ID between renders', () => {
    const component = TestRenderer.create(
      <ComponentUsingId className="header">Hello</ComponentUsingId>,
    );

    const originalId = component.toJSON().props.id;

    component.update(
      <ComponentUsingId className="footer">Goodbye</ComponentUsingId>,
    );

    expect(component.toJSON().props.id).toEqual(originalId);
  });

  it('should use an ID if one is supplied after render', () => {
    const component = TestRenderer.create(
      <ComponentUsingId>Hi</ComponentUsingId>,
    );

    const originalId = component.toJSON().props.id;

    component.update(<ComponentUsingId id="custom-id">Hi</ComponentUsingId>);

    expect(component.toJSON().props.id).not.toEqual(originalId);
    expect(component.toJSON().props.id).toEqual('custom-id');
  });

  it('should not change ID if one is supplied and then removed', () => {
    const component = TestRenderer.create(
      <ComponentUsingId>Hi</ComponentUsingId>,
    );

    const originalId = component.toJSON().props.id;

    component.update(<ComponentUsingId id="custom-id">Hi</ComponentUsingId>);
    component.update(<ComponentUsingId>Hi</ComponentUsingId>);

    expect(component.toJSON().props.id).toEqual(originalId);
  });

  it('should set ID to any value that is not undefined', () => {
    const component = TestRenderer.create(
      <ComponentUsingId id={null}>Hi</ComponentUsingId>,
    );

    expect(component.toJSON().props.id).toBeDefined();
    expect(component.toJSON().props.id).toBeNull();

    component.update(<ComponentUsingId id={0}>Hi</ComponentUsingId>);

    expect(component.toJSON().props.id).toBeDefined();
    expect(component.toJSON().props.id).toEqual(0);

    component.update(<ComponentUsingId id={false}>Hi</ComponentUsingId>);

    expect(component.toJSON().props.id).toBeDefined();
    expect(component.toJSON().props.id).toEqual(false);
  });
});
