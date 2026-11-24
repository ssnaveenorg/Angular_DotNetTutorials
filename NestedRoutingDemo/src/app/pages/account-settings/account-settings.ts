import { Component } from '@angular/core';

type Preference = { key: string; label: string; enabled: boolean };

@Component({
  standalone: true,
  templateUrl: './account-settings.html'
})
export class AccountSettings {
  // Dummy data 
  preferences: Preference[] = [
    { key: 'emailAlerts', label: 'Email alerts for orders', enabled: true },
    { key: 'smsAlerts', label: 'SMS alerts for delivery', enabled: false },
    { key: 'weeklySummary', label: 'Weekly activity summary', enabled: true }
  ];

  profile = {
    fullName: 'Pranaya Rout',
    phone: '+91-90000-00000',
    city: 'Bhubaneswar'
  };

  save(): void {
    // Demo method — replace with service call
    alert('Settings saved (demo).');
  }

  toggle(prefKey: string): void {
    const p = this.preferences.find(x => x.key === prefKey);
    if (p) p.enabled = !p.enabled;
  }
}
