import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  Box,
  Typography,
  Modal,
  Divider,
  Button,
  Stack,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import styles from '../addModal.module.css';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useMenuContext } from '../../../provider/Menu';

const boxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  py: 4,
};
const RecipeModal = (props) => {
  const { recipesData, setRecipesData } = useMenuContext();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setRecipesData({ ...recipesData, [name]: value.trim() });
  };

  //========Save recipes data===========
  const saveRecipeData = () => {
    const length = Object.values(recipesData).length;
    //1. Check if recipe's inputs are empty or not
    if (length === 0) toast.error('Бөглөх бүх талбар хоосон байна!');
    if (length === 1) toast.error('Бөглөх талбарын аль нэг нь хоосон байна!');
    //2. If inputs are full then continue
    if (length === 2) props.onCloseHandler(false);
  };

  return (
    <div>
      <Modal open={props.onOpen} onClose={props.onCloseHandler}>
        <Box sx={boxStyle}>
          <Stack direction="column" justifyContent="center">
            {/* HEADER */}
            <Stack direction="row" alignItems="center" justifyContent="space-between" pb={2} mx={5}>
              <Box component="span" onClick={props.onCloseHandler}>
                <CloseRoundedIcon fontSize="small" />
              </Box>
              <Box mx={10}>
                <Typography variant="font24Bold700">Орц нэмэх </Typography>
              </Box>
              <Button variant="contained" onClick={saveRecipeData}>
                Хадгалах
              </Button>
            </Stack>
            <Divider />
            {/*=========== Add recipes========== */}
            <Stack direction="row" mb={10}>
              <Box className={styles.inputs} mx={10}>
                {/* INPUT-1 */}
                <Stack direction="column">
                  <Typography variant="font16Bold600" color="secondary.black" mt={5} mb={2}>
                    Орцны нэр
                  </Typography>
                  <TextField placeholder="Энд бичнэ үү" name="name" value={recipesData.name} onChange={inputHandler} />
                </Stack>{' '}
                {/* INPUT-2 */}
                <Stack direction="row">
                  <Stack>
                    <Typography variant="font16Bold600" color="secondary.black" mt={5} mb={2}>
                      Төрөл
                    </Typography>
                    <FormControl sx={{ minWidth: 200 }}>
                      <InputLabel id="demo-simple-select-label">Төрөл</InputLabel>
                      <Select value={recipesData.amountType} name="amountType" onChange={inputHandler}>
                        <MenuItem value={'грамм'}>грамм</MenuItem>
                        <MenuItem value={'ширхэг'}>ширхэг</MenuItem>
                      </Select>
                    </FormControl>{' '}
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </Stack>
        </Box>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default RecipeModal;
