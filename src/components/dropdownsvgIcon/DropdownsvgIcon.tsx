import { ListItemIcon } from '@mui/material';

type DropdownsvgIconProps = {
  iconUrl?: any;
  filter?: string;
  maxheight?: string;
  maxWidth?: string;
  color?: string;
};
export default function DropdownsvgIcon({ iconUrl, filter, maxheight, maxWidth, color }: DropdownsvgIconProps) {
  return (
    <ListItemIcon>
      {color ? (
        iconUrl
      ) : (
        <picture style={{ display: 'flex' }}>
          <img
            src={iconUrl}
            style={{
              filter:
                filter ||
                'brightness(0) saturate(100%) invert(10%) sepia(12%) saturate(5289%) hue-rotate(202deg) brightness(95%) contrast(104%)',
              maxHeight: maxheight || '23px',
              maxWidth: maxWidth || '30px',
              width: '100%',
              height: '100%',
            }}
            alt='icon'
          />
        </picture>
      )}
    </ListItemIcon>
  );
}
