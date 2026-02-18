import React, { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Button,
  FormControlLabel,
  Checkbox,
  FormGroup,
} from "@mui/material";

import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";

interface loginType {
  title?: string;
  subtitle?: React.ReactNode;
  subtext?: React.ReactNode;
}

const REMEMBER_KEY = "ring_remembered_user";

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Sayfa açılınca kaydedilmiş kullanıcı adını yükle
  React.useEffect(() => {
    const saved = localStorage.getItem(REMEMBER_KEY);
    if (saved) {
      setUsername(saved);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    // Frontend alan kontrolü
    if (!username.trim()) {
      setError("Kullanıcı adı boş bırakılamaz.");
      return;
    }
    if (!password) {
      setError("Şifre boş bırakılamaz.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const response = await api.post("/login", { username, password });
      console.log("Login success:", response.data);

      if (rememberMe) {
        localStorage.setItem(REMEMBER_KEY, username);
      } else {
        localStorage.removeItem(REMEMBER_KEY);
      }

      router.push("/");
    } catch (err: unknown) {
      console.error("Login hatası:", err);
      const backendMsg =
        (err as { response?: { data?: { message?: string; error?: { description?: string } } } })?.response?.data?.message ||
        (err as { response?: { data?: { message?: string; error?: { description?: string } } } })?.response?.data?.error?.description;

      if (backendMsg) {
        setError(backendMsg);
      } else {
        setError("Sunucuya bağlanamıyor. Lütfen daha sonra tekrar deneyin.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <form onSubmit={handleLogin}>
        <Stack>
          <Box>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="username"
              mb="5px"
            >
              Kullanıcı Adı
            </Typography>
            <CustomTextField
              id="username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
            />
          </Box>
          <Box mt="25px">
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="password"
              mb="5px"
            >
              Şifre
            </Typography>
            <CustomTextField
              id="password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            />
          </Box>
          <Stack
            justifyContent="flex-start"
            direction="row"
            alignItems="center"
            my={2}
          >
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRememberMe(e.target.checked)}
                  />
                }
                label="Beni Hatırla"
              />
            </FormGroup>
          </Stack>
        </Stack>

        {error && (
          <Typography color="error" mb={2} variant="body2">
            {error}
          </Typography>
        )}

        <Box>
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
            disabled={loading}
          >
            {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
          </Button>
        </Box>
      </form>
      {subtitle}
    </>
  );
};

export default AuthLogin;
