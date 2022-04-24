// @ts-nocheck
import { Dispatch } from 'react';

interface IDate {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  showDays: boolean;
  showHours: boolean;
  showMinutes: boolean;
  showSeconds: boolean;
}
// 根据传入的参数，自动调整显示的时间间隔
export const updateTimes = (date: IDate) => {
  let d = date.days;
  let h = date.hours;
  let m = date.minutes;
  let s = date.seconds;

  if (date.showSeconds && s >= 60) {
    m += Math.floor(s / 60);
    s %= 60;
  }
  if (date.showMinutes && m >= 60) {
    h += Math.floor(m / 60);
    m %= 60;
  }
  if (date.showDays && date.showHours && h >= 24) {
    d += Math.floor(h / 24);
    h %= 24;
  }
  const arr = [];
  if (date.showDays) {
    arr.push(d);
  }
  if (date.showHours) {
    arr.push(h);
  }
  if (date.showMinutes) {
    arr.push(m);
  }
  if (date.showSeconds) {
    arr.push(s);
  }
  return arr;
};

/**
 * 倒计时函数
 * */
export const updateCountdown = (
  defaultValue: string,
  countdown: number,
  setCountdown: Dispatch<string | number>
) => {
  // 初始化时间
  if (countdown < 0) {
    setCountdown(defaultValue);
    return;
  }
  setCountdown(countdown);
  countdown--;
  setTimeout(() => {
    updateCountdown(defaultValue, countdown, setCountdown);
  }, 1000);
};
