import asyncio
import json

from aiogram import types
from aiogram import Bot, Dispatcher
from aiogram.fsm.context import FSMContext
from aiogram.filters.command import Command
from aiogram.types import ReplyKeyboardMarkup, KeyboardButton, WebAppInfo

bot = Bot(token="7696928924:AAG16mNxIBJTaiWBPMCNR_e-wmi8XbWw2S0")
dp = Dispatcher()

@dp.message(Command('start'))
async def start(message: types.Message, state: FSMContext):
    item1 = KeyboardButton(text="Выбрать товар", web_app=WebAppInfo(url='https://kenzaev.github.io/savdorutb.sub.io/'))
    keyboard = ReplyKeyboardMarkup(keyboard=[[item1]], resize_keyboard=True)
    await bot.send_message(message.from_user.id, "Добро пожаловать", reply_markup=keyboard)

@dp.message()
async def web_app(message: types.Message):
    json_data = message.web_app_data.data
    parsed_data = json.loads(json_data)
    message_text = ""
    for i, item in enumerate(parsed_data['items'], start=1):
        position = int(item['id'].replace('item', ''))
        message_text += f"Позиция {position}\n"
        message_text += f"Стоимость: {item['price']}\n\n"

    message_text += f"Общая стоимость товаров: {parsed_data['totalPrice']}"

    await bot.send_message(message.from_user.id, message_text)
    await bot.send_message('YOUR_CHAT_ID', f"Новый заказ\n{message_text}")

async def main():
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
