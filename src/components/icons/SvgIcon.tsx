'use client';
import React from 'react';
import Image from 'next/image';

// Map of icon names to their SVG file paths
export const iconMap: Record<string, string> = {
  // Architecture & Systems
  'architecture': '/assets/img/svg-icons/Layout.svg',
  'cloud': '/assets/img/svg-icons/Cloud.svg',
  'server': '/assets/img/svg-icons/Desktop Monitor.svg',
  'database': '/assets/img/svg-icons/Box.svg',
  'settings': '/assets/img/svg-icons/Settings 1.svg',
  'gear': '/assets/img/svg-icons/Gear.svg',
  
  // ML & AI
  'ml': '/assets/img/svg-icons/Beaker.svg',
  'robot': '/assets/img/svg-icons/Bug.svg',
  'brain': '/assets/img/svg-icons/Light Bulb.svg',
  'code': '/assets/img/svg-icons/Code.svg',
  
  // Data & Analytics
  'data': '/assets/img/svg-icons/Chart Statistics 1.svg',
  'chart': '/assets/img/svg-icons/Chart Statistics 2.svg',
  'analytics': '/assets/img/svg-icons/Pie Chart.svg',
  'trend-up': '/assets/img/svg-icons/Trend Up 1.svg',
  'trend-down': '/assets/img/svg-icons/Trend Down 1.svg',
  
  // Security & Compliance
  'security': '/assets/img/svg-icons/Shield 1.svg',
  'lock': '/assets/img/svg-icons/Lock.svg',
  'shield': '/assets/img/svg-icons/Shield Checkmark.svg',
  'key': '/assets/img/svg-icons/Key.svg',
  
  // Healthcare
  'hospital': '/assets/img/svg-icons/Hospital.svg',
  'medical': '/assets/img/svg-icons/Medical Kit.svg',
  'health': '/assets/img/svg-icons/Heart.svg',
  'heartbeat': '/assets/img/svg-icons/Heartbeat.svg',
  'stethoscope': '/assets/img/svg-icons/Stethoscope.svg',
  'ambulance': '/assets/img/svg-icons/Ambulance.svg',
  'dna': '/assets/img/svg-icons/DNA.svg',
  'virus': '/assets/img/svg-icons/Virus.svg',
  'syringe': '/assets/img/svg-icons/Syringe.svg',
  'thermometer': '/assets/img/svg-icons/Thermometer.svg',
  
  // Business & Process
  'process': '/assets/img/svg-icons/Synch Reload Right_1.svg',
  'target': '/assets/img/svg-icons/Target 1.svg',
  'checkmark': '/assets/img/svg-icons/Checkmark.svg',
  'check-circle': '/assets/img/svg-icons/Check Circle.svg',
  'clipboard': '/assets/img/svg-icons/Clipboard Check.svg',
  'document': '/assets/img/svg-icons/Document 1.svg',
  'folder': '/assets/img/svg-icons/Folder.svg',
  'calendar': '/assets/img/svg-icons/Calendar.svg',
  'clock': '/assets/img/svg-icons/Clock 1.svg',
  'time': '/assets/img/svg-icons/Time.svg',
  'stopwatch': '/assets/img/svg-icons/Stop Watch.svg',
  
  // Communication
  'email': '/assets/img/svg-icons/Email.svg',
  'phone': '/assets/img/svg-icons/Phone.svg',
  'chat': '/assets/img/svg-icons/Chat Message.svg',
  'notification': '/assets/img/svg-icons/Notification.svg',
  'announcement': '/assets/img/svg-icons/Announcement.svg',
  'megaphone': '/assets/img/svg-icons/Megaphone Speaker.svg',
  
  // Navigation & Actions
  'arrow-right': '/assets/img/svg-icons/Arrow Right.svg',
  'arrow-left': '/assets/img/svg-icons/Arrow Left.svg',
  'arrow-up': '/assets/img/svg-icons/Arrow Up.svg',
  'arrow-down': '/assets/img/svg-icons/Arrow Down.svg',
  'chevron-right': '/assets/img/svg-icons/Chevron Rigth.svg',
  'chevron-left': '/assets/img/svg-icons/Chevron Left.svg',
  'chevron-up': '/assets/img/svg-icons/Chevron Up.svg',
  'chevron-down': '/assets/img/svg-icons/Chevron Down.svg',
  'external-link': '/assets/img/svg-icons/Arrow Diagonal Up Right.svg',
  'download': '/assets/img/svg-icons/Download.svg',
  'upload': '/assets/img/svg-icons/Upload.svg',
  'search': '/assets/img/svg-icons/Search.svg',
  'filter': '/assets/img/svg-icons/Filter.svg',
  'refresh': '/assets/img/svg-icons/Refresh Right Redo.svg',
  'close': '/assets/img/svg-icons/Close.svg',
  'plus': '/assets/img/svg-icons/Plus.svg',
  'minus': '/assets/img/svg-icons/Minus.svg',
  
  // User & Profile
  'user': '/assets/img/svg-icons/Person.svg',
  'users': '/assets/img/svg-icons/Account.svg',
  'profile': '/assets/img/svg-icons/User Profile 1.svg',
  'team': '/assets/img/svg-icons/Account Box.svg',
  'add-person': '/assets/img/svg-icons/Add Person.svg',
  
  // Finance & Commerce
  'dollar': '/assets/img/svg-icons/Dollar.svg',
  'money': '/assets/img/svg-icons/Money Dollar.svg',
  'wallet': '/assets/img/svg-icons/Wallet.svg',
  'credit-card': '/assets/img/svg-icons/Credit Card 1.svg',
  'bank': '/assets/img/svg-icons/Bank.svg',
  'receipt': '/assets/img/svg-icons/Receipt Paper Bill.svg',
  'cart': '/assets/img/svg-icons/Shopping Cart.svg',
  'bag': '/assets/img/svg-icons/Shopping Bag.svg',
  
  // Location & Travel
  'location': '/assets/img/svg-icons/Location Map Marker 1.svg',
  'map': '/assets/img/svg-icons/Map.svg',
  'compass': '/assets/img/svg-icons/Compass.svg',
  'globe': '/assets/img/svg-icons/Planet.svg',
  
  // Devices & Tech
  'monitor': '/assets/img/svg-icons/Desktop Monitor.svg',
  'mobile': '/assets/img/svg-icons/Mobile Phone.svg',
  'tablet': '/assets/img/svg-icons/Tablet Mobile.svg',
  'camera': '/assets/img/svg-icons/Camera 1.svg',
  'video': '/assets/img/svg-icons/Video.svg',
  'microphone': '/assets/img/svg-icons/Microphone.svg',
  'headphones': '/assets/img/svg-icons/Headphones.svg',
  'printer': '/assets/img/svg-icons/Printer.svg',
  
  // Status & Alerts
  'warning': '/assets/img/svg-icons/Warning Triangle.svg',
  'error': '/assets/img/svg-icons/Cancel Close Circle.svg',
  'success': '/assets/img/svg-icons/Checkmark Circle.svg',
  'info': '/assets/img/svg-icons/Alert Sign Circle.svg',
  'alert': '/assets/img/svg-icons/Alert Sign.svg',
  
  // Misc
  'star': '/assets/img/svg-icons/Star.svg',
  'heart': '/assets/img/svg-icons/Heart.svg',
  'like': '/assets/img/svg-icons/Like.svg',
  'bookmark': '/assets/img/svg-icons/Bookmark 1.svg',
  'link': '/assets/img/svg-icons/Link.svg',
  'copy': '/assets/img/svg-icons/Copy.svg',
  'edit': '/assets/img/svg-icons/Edit 1.svg',
  'trash': '/assets/img/svg-icons/Trash Bin.svg',
  'save': '/assets/img/svg-icons/Save.svg',
  'eye': '/assets/img/svg-icons/Eye.svg',
  'eye-off': '/assets/img/svg-icons/Eye DIsabled.svg',
  'menu': '/assets/img/svg-icons/Menu 1.svg',
  'apps': '/assets/img/svg-icons/Apps.svg',
  'home': '/assets/img/svg-icons/Home 1.svg',
  'building': '/assets/img/svg-icons/Bank.svg',
  'graduation': '/assets/img/svg-icons/Graduation Hat.svg',
  'book': '/assets/img/svg-icons/Book.svg',
  'notebook': '/assets/img/svg-icons/Notebook.svg',
  'briefcase': '/assets/img/svg-icons/Suitcase 1.svg',
  'truck': '/assets/img/svg-icons/Truck.svg',
  'delivery': '/assets/img/svg-icons/Delivery.svg',
  'package': '/assets/img/svg-icons/Package.svg',
  'box': '/assets/img/svg-icons/Box.svg',
};

interface SvgIconProps {
  name: string;
  size?: number;
  className?: string;
  color?: string;
  style?: React.CSSProperties;
}

export const SvgIcon: React.FC<SvgIconProps> = ({ 
  name, 
  size = 24, 
  className = '',
  color,
  style = {}
}) => {
  const iconPath = iconMap[name];
  
  if (!iconPath) {
    console.warn(`Icon "${name}" not found in iconMap`);
    return null;
  }
  
  return (
    <Image
      src={iconPath}
      alt={name}
      width={size}
      height={size}
      className={className}
      style={{
        filter: color ? `brightness(0) saturate(100%)` : undefined,
        ...style
      }}
    />
  );
};

// Certification-specific icon mapping
export const certificationIcons: Record<string, string> = {
  'architecture': '/assets/img/svg-icons/Layout.svg',
  'ml': '/assets/img/svg-icons/Beaker.svg',
  'data': '/assets/img/svg-icons/Chart Statistics 1.svg',
  'devops': '/assets/img/svg-icons/Gear.svg',
  'security': '/assets/img/svg-icons/Shield 1.svg',
  'healthcare': '/assets/img/svg-icons/Hospital.svg',
  'process': '/assets/img/svg-icons/Target 1.svg',
};

export default SvgIcon;
