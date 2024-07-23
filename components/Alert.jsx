import * as React from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function JournalCreated() {
  return (
    <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
      Your Journal was Successfully Created
    </Alert>
  );
}
export function ActionAlerts() {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="warning" onClose={() => {}}>
        This Alert displays the default close icon.
      </Alert>
      <Alert
        severity="success"
      >
        Your Journal was Successfully Created.
      </Alert>
    </Stack>
  );
}
