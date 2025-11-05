import MobileDrawer from '@/components/common/Drawer';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import React from 'react';

interface FontDrawerProps {
  open: boolean;
  onClose: () => void;
}

function FontDrawer({ open, onClose }: FontDrawerProps) {
  const fonts = [
    {
      name: 'لاله زار',
      image: 'https://api.domingo.ir/Files/PredefinedFont_Medias/a018b3f1-8364-477a-82e9-8bad882b54f2/Thumbnail/DFEBAC.svg',
      isPremium: false,
    },
    {
      name: 'شتاب',
      image: 'https://api.domingo.ir/Files/PredefinedFont_Medias/c73a3729-27e0-40ff-831f-b17dc7990ea7/Thumbnail/dk81c1cf.svg',
      isPremium: true,
    },
    {
      name: 'افرا',
      image: 'https://api.domingo.ir/Files/PredefinedFont_Medias/89f3121b-09ad-45eb-b84b-b2db6e6108ae/Thumbnail/DEBCBB.svg',
      isPremium: false,
    },
    {
      name: 'ذوالفنون',
      image: 'https://api.domingo.ir/Files/PredefinedFont_Medias/de2b2e65-5d18-4a26-9061-b405d3851043/Thumbnail/uf_1025.png',
      isPremium: true,
    },
    {
      name: 'قاهره',
      image: 'https://api.domingo.ir/Files/PredefinedFont_Medias/77930c89-9eca-40e8-ae3a-b9e9e40086fe/Thumbnail/CCAEAC.svg',
      isPremium: false,
    },
  ];

  return (
    <MobileDrawer open={open} onOpenChange={onClose} actions={null} title="انتخاب فونت" showClose={false} className="max-w-[500px] m-auto">
      <ScrollArea className="h-full">
        <div className="grid grid-cols-2 gap-2 px-3 pb-2">
          {fonts.map((font, index) => (
            <div
              key={index}
              className="flex flex-col items-center cursor-pointer rounded-sm border hover:bg-gray-50 transition-colors px-2 py-2"
            >
              <div className="w-[75px] h-9 bg-gray-100 rounded-sm overflow-hidden border">
                <img src={font.image} alt={font.name} width={75} height={36} className="w-full h-full object-contain" />
              </div>
              <p className="text-[10px] font-medium mt-1 truncate w-[70px] text-center" style={{ direction: 'rtl' }}>
                {font.name}
              </p>
            </div>
          ))}
        </div>
      </ScrollArea>
    </MobileDrawer>
  );
}

export default FontDrawer;
