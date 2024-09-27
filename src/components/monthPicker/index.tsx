import { styled, Box } from '@mui/material';
import DatePicker from 'react-datepicker';
import CancelIcon from '@/assets/cancelIcon';
import './monthPicker.css';
import { StyledDialog } from '@/components/StyledComponents/styledComponents';

type MonthPickerProps = {
  selectMonthDialogOpen: boolean;
  handleMonthDialogClose: () => void;
  setStartDate: (date: Date) => void;
  startDate: Date;
  customLocale: any;
};

export default function MonthPicker({
  startDate,
  setStartDate,
  handleMonthDialogClose,
  selectMonthDialogOpen,
  customLocale,
}: MonthPickerProps) {
  return (
    <StyledDialog onClose={handleMonthDialogClose} open={selectMonthDialogOpen}>
      <DialogWrapper>
        <Box
          sx={{
            position: 'absolute',
            right: '11px',
            marginTop: '12px',
            cursor: 'pointer',
          }}
          onClick={handleMonthDialogClose}>
          <CancelIcon />
        </Box>
        <Box className='monthPicker_wrapper'>
          <DatePicker
            locale={customLocale}
            selected={startDate}
            onChange={(date: any) => setStartDate(date)}
            dateFormat='MM/yyyy'
            showMonthYearPicker
            inline
            showFullMonthYearPicker
          />
        </Box>
      </DialogWrapper>
    </StyledDialog>
  );
}

export const DialogWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '257px',
  display: 'flex',
  flexDirection: 'column',
  boxSizing: 'border-box',
  position: 'relative',
  padding: '0px 5px',
  [theme.breakpoints.up('sm')]: {
    width: '414px',
    height: '257px',
  },
}));
