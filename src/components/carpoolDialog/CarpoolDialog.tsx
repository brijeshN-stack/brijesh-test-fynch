import { Box, styled, Typography } from '@mui/material';
import { CarpoolLabelTypographyWrapper, DialogHeaderTypography, maxWidth, StyledDialog } from '../StyledComponents/styledComponents';
import CancelIcon from '@/assets/cancelIcon';
import CustomTextField from '../textfield/CustomTextField';
import SwitchButton from '../switch/SwitchButton';
import { defaultStyle } from '@/config/colorConfig';
import CustomButton from '../button/CustomButton';
import { selectDialogLoading } from '@/redux/slices/tripsSlice';
import { RootState } from '@/redux/store';
import { useAppSelector } from '@/redux/hooks';
import CircularLoader from '../circularLoader/CircularLoader';

interface CarPoolDialogProps {
  handleCarPoolDialogChange: () => void;
  carpoolDialogOpen: boolean;
  handleCarpoolTextChange?: any;
  carpoolTextCount?: any;
  handleIsPassenger?: () => void;
  isPassenger?: boolean;
  handleCarpoolSubmit?: () => void;
  formErrors?: string;
  intl: any;
}
export default function CarpoolDialog({
  handleCarPoolDialogChange,
  carpoolDialogOpen,
  handleCarpoolTextChange,
  carpoolTextCount,
  handleIsPassenger,
  isPassenger,
  handleCarpoolSubmit,
  formErrors,
  intl,
}: CarPoolDialogProps) {
  const isDialogLoading = useAppSelector((state: RootState) => selectDialogLoading(state));

  return (
    <StyledDialog
      onClose={handleCarPoolDialogChange}
      open={carpoolDialogOpen}
      sx={{
        '.MuiDialog-paper': {
          maxWidth: '354px',
        },
      }}>
      {isDialogLoading && <CircularLoader />}
      <DialogWrapper>
        <Box sx={{ top: '8px', right: '14px', cursor: 'pointer', position: 'absolute' }} onClick={handleCarPoolDialogChange}>
          <CancelIcon />
        </Box>
        <Box
          sx={{
            display: 'flex',
            height: '38px',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}>
          <DialogHeaderTypography sx={{ maxWidth: '100%' }}>{intl?.formatMessage({ id: 'carpool' })}</DialogHeaderTypography>
        </Box>
        <CarpoolLabelTypographyWrapper>
          <Typography variant='title3' sx={{ fontWeight: 400, color: defaultStyle.primaryColor }}>
            {intl?.formatMessage({ id: 'how_many_people_travelling_together' })}
          </Typography>
        </CarpoolLabelTypographyWrapper>
        <Box
          sx={{
            width: '100%',
            marginTop: '14px',
            display: 'flex',
            justifyContent: 'center',
          }}>
          <CustomTextField
            className='form-fields'
            variant='secondary'
            name='licensePlate'
            value={carpoolTextCount}
            error={formErrors ? true : false}
            helperText={formErrors ? formErrors : undefined}
            handleChange={handleCarpoolTextChange}
            placeholder={intl?.formatMessage({ id: 'number_of_people' })}
            sx={{
              maxWidth: '287px',
              width: '100%',
            }}
            InputProps={{
              sx: {
                height: '38px ',
              },
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', gap: '9px', marginTop: '21px' }}>
          <SwitchButton checked={isPassenger} setChecked={handleIsPassenger} />
          <Typography variant='title4' sx={{ color: defaultStyle.defaultPriorityBoxBorder, opacity: '40%' }}>
            {intl?.formatMessage({ id: 'i_was_a_passenger' })}
          </Typography>
        </Box>
        <Box
          sx={{
            marginTop: '36px',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}>
          <CustomButton
            disabled={carpoolTextCount?.length > 0 ? false : true}
            variant='defaultSecondary'
            sx={{
              width: '160px',
              height: '36px',
              boxShadow: 0,
              borderRadius: '7px',
            }}
            handleClick={handleCarpoolSubmit}>
            {intl?.formatMessage({ id: 'save' })}
          </CustomButton>
        </Box>
      </DialogWrapper>
    </StyledDialog>
  );
}
const DialogWrapper = styled(Box)(({ theme }: any) => ({
  padding: '20px 25px 31px',
  width: '100%',
  position: 'relative',
}));
