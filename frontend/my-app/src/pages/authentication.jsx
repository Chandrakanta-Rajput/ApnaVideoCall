import React from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../contexts/AuthContext';
import { Snackbar } from '@mui/material';

const defaultTheme = createTheme();

export default function Authentication() {
  const [username, setUsername] = React.useState();
  const [password, setPassword] = React.useState();
  const [name, setName] = React.useState();
  const [error, setError] = React.useState();
  const [message, setMessage] = React.useState();
  const [formState, setFormState] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const { handleRegister, handleLogin } = React.useContext(AuthContext);

  let handleAuth = async () => {

     try {
      if (formState === 0) {
        let result=await handleLogin(username, password)
      }
      if (formState === 1) {
        let result = await handleRegister(name, username, password);
        console.log(result);
        setMessage(result);
        setOpen(true);
      }
    } catch (err) {
      console.log(err);
      const message = err?.response?.data?.message || "Something went wrong";
      setError(message);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container sx={{ height: '100vh', display: 'flex' }}>
        <CssBaseline />

        {/* Left Image Section */}
        <Grid
          sx={{
            display: { xs: 'none', sm: 'block' },
            flexBasis: { sm: '33.33%', md: '58.33%' },
           // backgroundImage: 'url(https://images.unsplash.com/photo-1497366811353-6870744d04b2)',
            backgroundImage: 'url(https://picsum.photos/1200/900)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Right Form Section */}
        <Grid
          component={Paper}
          elevation={6}
          square
          sx={{
            flexBasis: { xs: '100%', sm: '66.66%', md: '41.66%' },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 4,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>

          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Button variant={formState === 0 ? "contained" : "outlined"} onClick={() => setFormState(0)}>
              Sign In
            </Button>
            <Button variant={formState === 1 ? "contained" : "outlined"} onClick={() => setFormState(1)}>
              Sign Up
            </Button>
          </Box>

          <Box component="form" noValidate sx={{ mt: 1, width: '100%' }}>
            {formState === 1 && (
              <TextField
                margin="normal"
                required
                fullWidth
                id="fullname"
                label="Full Name"
                name="username"
                value={name}
                autoComplete="name"
                autoFocus
                onChange={(e) => setName(e.target.value)}
              />
            )}

            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              value={username}
              autoComplete="username"
              autoFocus
              onChange={(e) => setUsername(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              value={password}
              type="password"
              id="password"
              autoComplete={formState === 0 ? "current-password" : "new-password"}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p style={{ color: "red" }}>{error}</p>}

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleAuth}
            >
              {formState === 0 ? 'Login' : 'Register'}
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Snackbar
        open={open}
        autoHideDuration={4000}
        message={message}
        onClose={() => setOpen(false)}
      />
    </ThemeProvider>
  );
}
