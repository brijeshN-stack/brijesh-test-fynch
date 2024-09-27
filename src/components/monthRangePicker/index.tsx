import { Typography } from '@mui/material';
import { defaultStyle } from '@/config/colorConfig';
import CalendarIcon from '@/assets/calenderIcon';
import CustomButton from '@/components/button/CustomButton';

export default function MonthRangePicker({ buttonCommonStyle }: any) {
  return (
    <CustomButton sx={{ width: '294px', height: '38px', ...buttonCommonStyle }} showStartIcon={<CalendarIcon />}>
      <Typography variant='title3' sx={{ color: defaultStyle.monthRangePickerTextColor }}>
        Date Range
      </Typography>
      <Typography variant='title3' sx={{ color: defaultStyle.monthRangePickerDateColor }}>
        2023 Nov to 2022 Dec
      </Typography>
    </CustomButton>
  );
}
