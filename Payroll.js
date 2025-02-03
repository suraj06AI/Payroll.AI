import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const PayrollDemoApp = () => {
  const [employees, setEmployees] = useState([]);
  const [employeeData, setEmployeeData] = useState({
    name: '',
    salary: '',
    hourlyRate: '',
    hoursWorked: '',
    bonuses: '',
    deductions: '',
    taxDetails: '',
    bankInfo: '',
    vacationDays: '',
    sickDays: '',
  });
  const [payroll, setPayroll] = useState([]);

  const handleChange = (e) => {
    setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
  };

  const addEmployee = () => {
    if (employeeData.name && (employeeData.salary || employeeData.hourlyRate)) {
      setEmployees([
        ...employees,
        { ...employeeData, id: employees.length + 1 },
      ]);
      setEmployeeData({
        name: '',
        salary: '',
        hourlyRate: '',
        hoursWorked: '',
        bonuses: '',
        deductions: '',
        taxDetails: '',
        bankInfo: '',
        vacationDays: '',
        sickDays: '',
      });
    }
  };

  const runPayroll = () => {
    const processedPayroll = employees.map(emp => {
      const grossPay = emp.salary 
        ? parseFloat(emp.salary) 
        : parseFloat(emp.hourlyRate) * parseFloat(emp.hoursWorked);

      const bonuses = parseFloat(emp.bonuses || 0);
      const deductions = parseFloat(emp.deductions || 0);
      const tax = grossPay * 0.15; // Federal tax
      const netPay = grossPay + bonuses - deductions - tax;

      return {
        ...emp,
        grossPay,
        bonuses,
        deductions,
        tax,
        netPay,
      };
    });
    setPayroll(processedPayroll);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Payroll Demo App</h1>
      <Card className="mb-6">
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">Add/Edit Employee</h2>
          <Input placeholder="Name" name="name" value={employeeData.name} onChange={handleChange} className="mb-2" />
          <Input placeholder="Salary ($)" name="salary" type="number" value={employeeData.salary} onChange={handleChange} className="mb-2" />
          <Input placeholder="Hourly Rate ($)" name="hourlyRate" type="number" value={employeeData.hourlyRate} onChange={handleChange} className="mb-2" />
          <Input placeholder="Hours Worked" name="hoursWorked" type="number" value={employeeData.hoursWorked} onChange={handleChange} className="mb-2" />
          <Input placeholder="Bonuses ($)" name="bonuses" type="number" value={employeeData.bonuses} onChange={handleChange} className="mb-2" />
          <Input placeholder="Deductions ($)" name="deductions" type="number" value={employeeData.deductions} onChange={handleChange} className="mb-2" />
          <Textarea placeholder="Tax Details" name="taxDetails" value={employeeData.taxDetails} onChange={handleChange} className="mb-2" />
          <Textarea placeholder="Bank Info" name="bankInfo" value={employeeData.bankInfo} onChange={handleChange} className="mb-2" />
          <Input placeholder="Vacation Days" name="vacationDays" type="number" value={employeeData.vacationDays} onChange={handleChange} className="mb-2" />
          <Input placeholder="Sick Days" name="sickDays" type="number" value={employeeData.sickDays} onChange={handleChange} className="mb-4" />
          <Button onClick={addEmployee}>Add/Update Employee</Button>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">Employee List</h2>
          {employees.length === 0 ? (
            <p>No employees added.</p>
          ) : (
            <ul>
              {employees.map(emp => (
                <li key={emp.id} className="mb-2">
                  {emp.name} - Salary: ${emp.salary || 'N/A'}, Hourly: ${emp.hourlyRate || 'N/A'}, Bank: {emp.bankInfo}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <Button onClick={runPayroll} className="mb-6">Run Payroll</Button>

      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">Payroll Summary</h2>
          {payroll.length === 0 ? (
            <p>Run payroll to see the summary.</p>
          ) : (
            <ul>
              {payroll.map(emp => (
                <li key={emp.id} className="mb-2">
                  {emp.name}: Gross Pay - ${emp.grossPay.toFixed(2)}, Bonuses - ${emp.bonuses.toFixed(2)}, Deductions - ${emp.deductions.toFixed(2)}, Taxes - ${emp.tax.toFixed(2)}, Net Pay - ${emp.netPay.toFixed(2)}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PayrollDemoApp;
