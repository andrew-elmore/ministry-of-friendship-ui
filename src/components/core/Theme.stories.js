import React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import Table from '@mui/joy/Table';
import theme from './../../theme';

export default {
  title: 'Theme Showcase',
  decorators: [
    (Story) => (
      <CssVarsProvider theme={theme}>
        <Sheet sx={{ padding: 2, backgroundColor: 'var(--joy-palette-background-surface)' }}>
          {Story()}
        </Sheet>
      </CssVarsProvider>
    ),
  ],
};

export const Buttons = () => (
  <div>
    <Button color="primary" variant="solid">Primary Button</Button>
    <Button color="secondary" variant="solid" sx={{ marginLeft: 2 }}>Secondary Button</Button>
  </div>
);

export const Chips = () => (
  <div>
    <Chip color="primary">Primary Chip</Chip>
    <Chip color="secondary" variant="soft" sx={{ marginLeft: 2 }}>Secondary Chip</Chip>
  </div>
);

export const Inputs = () => (
  <div>
    <Input placeholder="Primary Input" color="primary" sx={{ marginBottom: 2 }} />
    <Textarea placeholder="Primary Textarea" color="primary" />
  </div>
);

export const Selects = () => (
  <Select defaultValue="option1" placeholder="Select an option" color="primary">
    <Option value="option1">Option 1</Option>
    <Option value="option2">Option 2</Option>
    <Option value="option3">Option 3</Option>
  </Select>
);

export const ThemedSheet = () => (
  <Sheet variant="plain" color="primary" sx={{ padding: 2, textAlign: 'center' }}>
    Themed Sheet with primary background
  </Sheet>
);

export const ProductComponents = () => (
  <Sheet sx={{ padding: 2, backgroundColor: 'var(--joy-palette-background-surface)' }}>
    <Typography level="h2" sx={{ marginBottom: 2 }}>Product Components</Typography>
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Species Name</th>
          <th>Status</th>
          <th>Date</th>
          <th>Observer</th>
          <th>Habitat</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>American Robin</td>
          <td>Verified</td>
          <td>2024-05-10 08:30</td>
          <td>Jane Smith</td>
          <td>Woodland</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Oak Tree</td>
          <td>Archived</td>
          <td>2024-05-10 08:30</td>
          <td>Jane Smith</td>
          <td>Woodland</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Stream Frog</td>
          <td>In Review</td>
          <td>2024-05-10 08:30</td>
          <td>Jane Smith</td>
          <td>Woodland</td>
        </tr>
        <tr>
          <td>4</td>
          <td>Axolotl</td>
          <td>Not Approved</td>
          <td>2024-05-10 08:30</td>
          <td>Jane Smith</td>
          <td>Woodland</td>
        </tr>
      </tbody>
    </Table>
  </Sheet>
);
