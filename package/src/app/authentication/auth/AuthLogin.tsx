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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";

interface loginType {
  title?: string;
  subtitle?: React.ReactNode;
  subtext?: React.ReactNode;
}

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // 1. Backend'e istek at
      const response = await api.post("/login", {
        username,
        password,
      });

      // 2. Başarılı ise token/user bilgisini kaydet (opsiyonel)
      // Session cookie otomatik set edilecek.
      console.log("Login success:", response.data);

      // 3. Yönlendir
      // window.location.href yerine router.push kullanmak daha SPA experience sağlar
      // ama cookie'nin header'a işlenmesi için bazen full reload gerekir.
      // Şimdilik router.push deneyelim.
      router.push("/");
    } catch (err: any) {
      console.error("Login hatası:", err);
      // Hata mesajını göster
      if (err.response?.status === 401) {
        setError("Kullanıcı adı veya şifre hatalı.");
      } else {
        setError("Giriş yapılırken bir sorun oluştu.");
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
              Username
            </Typography>
            <CustomTextField
              id="username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e: any) => setUsername(e.target.value)}
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
              Password
            </Typography>
            <CustomTextField
              id="password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
            />
          </Box>
          <Stack
            justifyContent="space-between"
            direction="row"
            alignItems="center"
            my={2}
          >
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Remeber this Device"
              />
            </FormGroup>
            <Typography
              component={Link}
              href="/"
              fontWeight="500"
              sx={{
                textDecoration: "none",
                color: "primary.main",
              }}
            >
              Forgot Password ?
            </Typography>
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
            {loading ? "Giriliyor..." : "Sign In"}
          </Button>
        </Box>
      </form>
      {subtitle}
    </>
  );
};

export default AuthLogin;
