import {
  Box,
  TextInput,
  Button,
  PasswordInput,
  Container,
  Title,
  Text,
  Anchor,
  NumberInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import classes from "../css/AuthenticationTitle.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import axios from "axios";
import React from "react";

export default function RegisterForm() {
  const navigate = useNavigate();
  const salt = bcrypt.genSaltSync(10);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },

    // functions will be used to validate values at corresponding key
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 6 ? "กรอกตั้งแต่ 6 ตัวขึ้นไป" : null,
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords did not match" : null,
    },
  });
  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        สมัครสมาชิก
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        มีบัญชีอยู่แล้วใช่ไหม ?{" "}
        <Anchor size="sm" component="button">
          <NavLink to={"/login"}>Login</NavLink>
        </Anchor>
      </Text>
      <Box mx="auto">
        <form
          onSubmit={form.onSubmit(async (values) => {
            try {
              const response = await axios.post(
                "http://localhost/project/register.php",
                {
                  email: values.email,
                  password: bcrypt.hashSync(values.password, salt),
                }
              );
              if (response.data.message) {
                alert("สมัครสมาชิกเรียบร้อย");
                navigate("/login");
              } else if (response.data.error) {
                if (response.data.error === "Email already exists") {
                  alert("อีเมลนี้ถูกใช้งานแล้ว");
                } else {
                  alert("เกิดข้อผิดพลาดในการสมัครสมาชิก");
                }
              }
            } catch (error) {
              console.error("An error occurred while registering:", error);
              alert("เกิดข้อผิดพลาดในการสมัครสมาชิก");
            }
          })}
        >
          <TextInput
            mt="sm"
            placeholder="Email"
            {...form.getInputProps("email")}
          />
          <PasswordInput
            mt="sm"
            placeholder="Password"
            {...form.getInputProps("password")}
          />
          <PasswordInput
            mt="sm"
            placeholder="Confirm password"
            {...form.getInputProps("confirmPassword")}
          />
          <Button type="submit" mt="sm" color="orange">
            ยืนยัน
          </Button>
        </form>
      </Box>
    </Container>
  );
}
