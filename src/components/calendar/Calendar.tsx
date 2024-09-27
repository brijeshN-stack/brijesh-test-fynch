import { Dispatch, ReactNode, SetStateAction } from 'react';
import ReactDatePicker from 'react-datepicker';
import { Box, styled, Typography, useTheme } from '@mui/material';
import { changeDateFormat, getMonthStartAndEndDatesForParams } from '@/utils/helpers';
import WorkFromHomeIcon from '@/assets/workFromHomeIcon';
import WorkFromOfficeIcon from '@/assets/workFromOfficeIcon';
import { defaultStyle } from '@/config/colorConfig';
import { TripsDataProps } from '@/types';
import {
  CalendarButtonWrapper,
  CalendarContainer,
  CalendarDateIconWrapper,
  CalendarTripAddSuggestionTypography,
  TypographyWrapper,
} from '@/components/StyledComponents/styledComponents';
import CustomButton from '@/components/button/CustomButton';
import './calendar.css';
import { isSameDay } from 'date-fns';
// import CurrentDateIcon from '@/assets/currentDate';
import { defaultCalendarMarkBlob } from '@/assets/blobs/defaultCalendarMarkBlob';

const buttonCommonStyle = {
  height: '27px',
  fontSize: '14px',
  fontWeight: '400',
  width: '50%',
};

const commonHeightAndWidth = {
  height: '7',
  width: '8',
};

interface BoxToContainIconProps {
  backgroundColor: string;
}
interface BoxTocontainCurrentDateIcon {
  daymarkblob: string;
}

type CalendarProps = {
  selectedPlaceInCalendar: string | undefined;
  setSelectedPlaceInCalendar: (selectedPlace: string | undefined) => void;
  selectedDate: Date | undefined;
  startDate: Date;
  setSelectedDate?: Dispatch<SetStateAction<Date | undefined>>;
  tripsData: TripsDataProps[] | undefined;
  handleDateChangeInCalendar: (date: Date) => void;
  work_from_home: string;
  work_from_office: string;
  work_from_home_suggestion: string;
  work_from_office_suggestion: string;
  customLocale: any;
  setSelectMonthDialogOpen: (value: boolean) => void;
  fullMonth: string;
  fullYear: number;
  calendar_button_suggestion: string;
  handleMonthChange: any;
  monthAndYearValueFromParams: any;
};

export default function Calendar({
  selectedPlaceInCalendar,
  setSelectedPlaceInCalendar,
  selectedDate,
  setSelectedDate,
  tripsData,
  handleDateChangeInCalendar,
  work_from_home,
  work_from_office,
  work_from_home_suggestion,
  work_from_office_suggestion,
  startDate,
  customLocale,
  setSelectMonthDialogOpen,
  fullMonth,
  fullYear,
  calendar_button_suggestion,
  handleMonthChange,
  monthAndYearValueFromParams,
}: CalendarProps) {
  const theme = useTheme();
  const textColor = theme.palette?.custom?.calendarVariant?.textColor;
  const wfhSvgBackground = theme.palette?.custom?.calendarVariant?.wfhSvgBackground;
  const wfhSvgInnerColor = theme.palette?.custom?.calendarVariant?.wfhSvgInnerColor;
  const wfoSvgBackground = theme.palette?.custom?.calendarVariant?.wfoSvgBackground;
  const wfoSvgInnerColor = theme.palette?.custom?.calendarVariant?.wfoSvgInnerColor;
  const dayMarkBlob = process.env.NEXT_PUBLIC_CALENDAR_SELECTED_DAY_MARK_SVG || defaultCalendarMarkBlob;

  const renderDayContents = (dayOfMonth: number, date?: Date): ReactNode => {
    if (!date) return dayOfMonth.toString();

    const dateKey = changeDateFormat(date);
    const findObject = tripsData?.find(item => item.date === dateKey);
    const isSelected = selectedDate && isSameDay(date, selectedDate);
    if (findObject) {
      return (
        <>
          <CalendarDateIconWrapper>
            <Box sx={{ position: 'relative' }}>
              <BoxToContainIcon backgroundColor={findObject.wfh ? wfhSvgBackground : findObject.wfo ? wfoSvgBackground : ''}>
                {findObject.wfh ? (
                  <WorkFromHomeIcon {...commonHeightAndWidth} fill={wfhSvgInnerColor} />
                ) : findObject.wfo ? (
                  <WorkFromOfficeIcon {...commonHeightAndWidth} fill={wfoSvgInnerColor} />
                ) : (
                  ''
                )}
              </BoxToContainIcon>
              {isSelected && (
                <BoxTocontainCurrentDateIcon daymarkblob={dayMarkBlob} />
                //   <CurrentDateIcon fill={calendarDayMarkColor} />
                // </BoxTocontainCurrentDateIcon>
              )}
              {dayOfMonth}
            </Box>
          </CalendarDateIconWrapper>
        </>
      );
    }
    return (
      <Box sx={{ position: 'relative' }}>
        {isSelected && (
          <BoxTocontainCurrentDateIcon daymarkblob={dayMarkBlob} />
          //   <CurrentDateIcon fill={calendarDayMarkColor} />
          // </BoxTocontainCurrentDateIcon>
        )}
        {dayOfMonth}
      </Box>
    );
  };
  const handlePlaceSelect = (selectedPlace: string) => {
    if (selectedPlaceInCalendar === selectedPlace) {
      setSelectedPlaceInCalendar(undefined);
    } else {
      setSelectedPlaceInCalendar(selectedPlace);
    }
    setSelectedDate && setSelectedDate(undefined);
  };

  const dayClassName = (date: Date) => {
    if (!selectedPlaceInCalendar && selectedDate) {
      const isSameDate = date.toDateString() === selectedDate.toDateString();
      return isSameDate ? 'selected_date' : '';
    }
    return '';
  };
  const { firstDate, lastDate } = getMonthStartAndEndDatesForParams(
    monthAndYearValueFromParams.monthValue,
    monthAndYearValueFromParams.yearValue,
  );
  const handleMonthSelectDialogOpne = () => {
    if (!monthAndYearValueFromParams.monthValue) {
      setSelectMonthDialogOpen(true);
    }
  };
  return (
    <CalendarContainer variant='calendarVariant'>
      {/* <CalendarWrapper> */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          justifyContent: 'center',
          marginTop: '27px',
        }}>
        <Typography
          variant='headerTitle'
          sx={{
            cursor: 'pointer',
            color: textColor,
          }}
          onClick={handleMonthSelectDialogOpne}
          color={defaultStyle.secondaryColor}>
          {fullMonth} {fullYear}
        </Typography>
      </Box>
      <CalendarButtonWrapper>
        <CustomButton
          sx={{
            ...buttonCommonStyle,
          }}
          variant={selectedPlaceInCalendar === 'home' ? 'defaultPrimaryContained' : 'defaultPrimaryOutlined'}
          handleClick={() => handlePlaceSelect('home')}
          showStartIcon={<WorkFromHomeIcon />}>
          <Typography variant='title3'> {work_from_home}</Typography>
        </CustomButton>
        <CustomButton
          sx={{
            ...buttonCommonStyle,
          }}
          variant={selectedPlaceInCalendar === 'office' ? 'defaultSecondaryContained' : 'defaultSecondaryOutlined'}
          handleClick={() => handlePlaceSelect('office')}
          showStartIcon={<WorkFromOfficeIcon />}>
          <Typography variant='title3'> {work_from_office}</Typography>
        </CustomButton>
      </CalendarButtonWrapper>
      <TypographyWrapper>
        <CalendarTripAddSuggestionTypography color={textColor}>
          {selectedPlaceInCalendar === 'home' && work_from_home_suggestion}
          {selectedPlaceInCalendar === 'office' && work_from_office_suggestion}
          {!selectedPlaceInCalendar && calendar_button_suggestion}
        </CalendarTripAddSuggestionTypography>
      </TypographyWrapper>
      <Box sx={{ width: '100%', height: '295px', boxSizing: 'border-box' }}>
        <ReactDatePicker
          locale={customLocale}
          calendarStartDay={1}
          selected={selectedDate}
          inline
          minDate={firstDate}
          maxDate={lastDate}
          onMonthChange={handleMonthChange}
          openToDate={startDate}
          renderDayContents={renderDayContents}
          // onChange={(date: any) => setSelectedDate(date)}
          onChange={handleDateChangeInCalendar}
          formatWeekDay={nameOfDay => nameOfDay.substr(0, 3)}
          dayClassName={dayClassName}
        />
      </Box>
      {/* </CalendarWrapper> */}
    </CalendarContainer>
  );
}

export const BoxToContainIcon = styled(Box)<BoxToContainIconProps>(({ backgroundColor }) => ({
  top: '-7px',
  right: '-10px',
  position: 'absolute',
  width: '15px',
  height: '15px',
  background: backgroundColor,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  zIndex: '1',
}));

const BoxTocontainCurrentDateIcon = styled(Box)<BoxTocontainCurrentDateIcon>(({ daymarkblob }) => ({
  backgroundImage: `url("data:image/svg+xml;base64,${daymarkblob}")`,
  position: 'absolute',
  marginLeft: process.env.NEXT_PUBLIC_CALENDAR_SELECTED_DAY_MARK_LEFT || '-7px',
  marginTop: process.env.NEXT_PUBLIC_CALENDAR_SELECTED_DAY_MARK_TOP || '-8px',
  height: '34px',
  width: '34px',
  backgroundRepeat: 'no-repeat',
}));
// const BoxTocontainCurrentDateIcon = styled(Box)(() => ({
//   position: 'absolute',
//   top: '-8px',
//   left: '-10px',
// }));
