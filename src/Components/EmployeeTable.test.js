import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EmployeeTable from './EmployeeTable';

const employees = [
  { id: 3, name: 'Charlie', isHSAEligible: true, maxHSAContribution: 2500, imageUrl: 'charlie.jpg' },
  { id: 1, name: 'Alice', isHSAEligible: true, maxHSAContribution: 3000, imageUrl: 'alice.jpg' },
  { id: 2, name: 'Bob', isHSAEligible: false, maxHSAContribution: 2000, imageUrl: 'bob.jpg' },
];

describe('EmployeeTable', () => {
  it('sorts employees by name when header is clicked', () => {
    render(<EmployeeTable employees={employees} onClick={jest.fn()} />);

    const initiallyRenderedNames = screen.getAllByText(/Alice|Bob|Charlie/).map(el => el.textContent);
    expect(initiallyRenderedNames).toEqual(['Alice', 'Bob', 'Charlie']);

    const nameHeader = screen.getByText('Employee');
    fireEvent.click(nameHeader);
    const sortedNames = screen.getAllByText(/Alice|Bob|Charlie/).map(el => el.textContent);
    expect(sortedNames).toEqual(['Charlie', 'Bob', 'Alice']);
  });

  it('sorts employees by maxHSAContribution when header is clicked', () => {
    render(<EmployeeTable employees={employees} onClick={jest.fn()} />);

    const maxHSAHeader = screen.getByText('Max HSA Deductible');

    // descending first
    fireEvent.click(maxHSAHeader);
    const reRenderedNames = screen.getAllByText(/Alice|Bob|Charlie/).map(el => el.textContent);
    expect(reRenderedNames).toEqual(['Alice', 'Charlie', 'Bob']);

    // ascending on second click
    fireEvent.click(maxHSAHeader);
    const renderedNames = screen.getAllByText(/Alice|Bob|Charlie/).map(el => el.textContent);
    expect(renderedNames).toEqual(['Bob', 'Charlie', 'Alice']);
  });

  it('sorts employees by isHSAEligible when header is clicked', () => {
    render(<EmployeeTable employees={employees} onClick={jest.fn()} />);

    const isHSAHeader = screen.getByText('Is HSA Eligible?');

    fireEvent.click(isHSAHeader);
    const namesSortedAscByEligibility = ['Alice', 'Charlie', 'Bob'];
    const renderedNames = screen.getAllByText(/Alice|Bob|Charlie/).map(el => el.textContent);
    expect(renderedNames).toEqual(namesSortedAscByEligibility);

    fireEvent.click(isHSAHeader);
    const namesSortedDescByEligibility = ['Bob', 'Alice', 'Charlie'];
    const reRenderedNames = screen.getAllByText(/Alice|Bob|Charlie/).map(el => el.textContent);
    expect(reRenderedNames).toEqual(namesSortedDescByEligibility);
  });
});