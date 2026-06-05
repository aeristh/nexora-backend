import { BaseSeeder } from '@adonisjs/lucid/seeders'
import ContactInfo from '#models/contact_info'

export default class extends BaseSeeder {
  async run() {
    await ContactInfo.createMany([
      {
        label: 'WhatsApp',
        displayText: '+62 858-0725-4735',
        url: 'https://wa.me/6285807254735',
        iconKey: 'whatsapp',
        isActive: true,
        sortOrder: 1,
      },
      {
        label: 'Email',
        displayText: 'xciaaan@email.com',
        url: 'mailto:xciaaan@email.com',
        iconKey: 'email',
        isActive: true,
        sortOrder: 2,
      },
      {
        label: 'Instagram',
        displayText: '@secrett_zn',
        url: 'https://instagram.com/secrett_zn',
        iconKey: 'instagram',
        isActive: true,
        sortOrder: 3,
      },
      {
        label: 'TikTok',
        displayText: '@aeristh4u',
        url: 'https://tiktok.com/@aeristh4u',
        iconKey: 'tiktok',
        isActive: true,
        sortOrder: 4,
      },
    ])
  }
}