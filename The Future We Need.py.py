#!/usr/bin/env python
# coding: utf-8

# In[1]:


#importing libraries
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

df = pd.read_excel("Forest_IMP-data.xlsx")
df.head(10)


# In[2]:


#data preperation
mean_values = df['Geo-graphical Forest Area (GA)'].mean()
df['Geo-graphical Forest Area (GA)'].fillna(value=mean_values, inplace = True)
df["Geo-graphical Forest Area (GA)"] = df["Geo-graphical Forest Area (GA)"].astype('float')
df['Rain(annual)mm'] = pd.to_numeric(df['Rain(annual)mm'],errors='coerce')


# In[3]:


df['Growing_Stock(m. cum)'] = pd.to_numeric(df['Growing_Stock(m. cum)'],errors='coerce')
mean_vo = df["Growing_Stock(m. cum)"].mean()
df['Growing_Stock(m. cum)'].fillna(value=mean_vo, inplace = True)


# In[4]:


df['Growing_Stock(m. cum)'] = df['Growing_Stock(m. cum)'].astype('float')
df['VDF'] = df['VDF'].astype('float')
df['MDF'] = df['MDF'].astype('float')
df['Rain(annual)mm'] = df['Rain(annual)mm'].astype('float')
df['OF'] = df['OF'].astype('float')


# In[23]:


mean_val = df["VDF"].mean()
df['VDF'].fillna(value=mean_val, inplace = True)
mean_va = df["MDF"].mean()
df['MDF'].fillna(value=mean_va, inplace = True)
mean_ve = df["OF"].mean()
df['OF'].fillna(value=mean_ve, inplace = True)


# In[24]:


df = df.loc[:, ~df.columns.str.contains('^Unnamed')]


# In[25]:


df.head(20)


# In[26]:


df.isnull().sum()


# In[27]:


mean_value = df["Rain(annual)mm"].mean()
df['Rain(annual)mm'].fillna(value=mean_value, inplace = True)


# In[28]:


df.head(20)


# In[226]:


#Data Visualization
plt.scatter(df['MDF'], df['Growing_Stock(m. cum)'])
plt.title("Scatter Plot")
plt.xlabel('MDF')
plt.ylabel('Growing_Stock(m. cum)')
plt.show()


# In[227]:


plt.scatter(df['VDF'], df['Growing_Stock(m. cum)'])
plt.title("Scatter Plot")
plt.xlabel('VDF')
plt.ylabel('Growing_Stock(m. cum)')

plt.show()


# In[228]:


plt.scatter(df['OF'], df['Growing_Stock(m. cum)'])
plt.title("Scatter Plot")
plt.xlabel('OF')
plt.ylabel('Growing_Stock(m. cum)')

plt.show()


# In[229]:


plt.scatter(df['Geo-graphical Forest Area (GA)'], df['Growing_Stock(m. cum)'])
plt.title("Scatter Plot")
plt.xlabel('Geo-graphical Forest Area (GA)')
plt.ylabel('Growing_Stock(m. cum)')

plt.show()


# In[230]:


plt.scatter(df['Rain(annual)mm'], df['Growing_Stock(m. cum)'])
plt.title("Scatter Plot")
plt.xlabel('Rain(annual)mm')
plt.ylabel('Growing_Stock(m. cum)')

plt.show()


# In[231]:


# Line plot
sns.lineplot(x='Year', y='Growing_Stock(m. cum)', data=df)
plt.title('Line Plot - Year vs. Stock Growth')
plt.show()


# In[232]:


# Box plot
sns.boxplot(x='Rain(annual)mm', y='Growing_Stock(m. cum)', data=df)
plt.title('Box Plot - Rainfall vs. Stock Growth')
plt.show()


# In[ ]:





# In[233]:


# Pairwise scatter plot
sns.pairplot(data=df[['Geo-graphical Forest Area (GA)', 'Rain(annual)mm', 'MDF', 'VDF', 'OF', 'Growing_Stock(m. cum)','Year']])
plt.title('Pairwise Scatter Plot')
plt.show()


# In[ ]:





# In[29]:


X = df.iloc[:, [0,1,2,3,4]]
y = df.iloc[:, 5]


# In[30]:


print("Input", X.head())


# In[31]:


print("Output", y.head())


# In[32]:


#standardising dataset
from sklearn.preprocessing import StandardScaler
scaler = StandardScaler()


# In[33]:


from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.20, random_state=42)


# In[34]:


X_train = scaler.fit_transform(X_train)


# In[35]:


X_test = scaler.transform(X_test)


# In[36]:


from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor


# In[37]:


#train your model
#model = RandomForestRegressor()


# In[250]:


#model.fit(X_train, y_train)


# In[39]:


# Create and train the Gradient Boosting Regression model
gb = GradientBoostingRegressor(n_estimators=100, random_state=42)
gb.fit(X_train, y_train)


# In[40]:


# Calculate and print the accuracy of the model
accuracy = gb.score(X_test, y_test)
print("Gradient Boosting Regression accuracy:", accuracy)


# In[ ]:





# In[ ]:





# In[ ]:





# In[235]:


# Prepare the data for time-series analysis
# Assuming you have a column 'year' for the year and a column 'stock_growth' for the target variable
ts_data = df[['Year', 'Growing_Stock(m. cum)']].copy()

# Convert the 'year' column to a datetime object and set it as the index
ts_data['Year'] = pd.to_datetime(ts_data['Year'], format='%Y')
ts_data.set_index('Year', inplace=True)


# In[236]:


# Fit the ARIMA model to the entire dataset
model = ARIMA(ts_data['Growing_Stock(m. cum)'], order=(1, 1, 1))
model_fit = model.fit()

# Forecast future stock growth for specific years
future_years = [2023, 2025, 2027]  # Specify the years for which you want to forecast
forecast_period = len(future_years)  # Number of periods to forecast


# In[ ]:





# In[ ]:





# In[237]:


# Generate future timestamps based on the specified years
last_year = ts_data.index[-215].year
future_timestamps = pd.date_range(start=str(last_year), periods=forecast_period, freq='AS')


# In[238]:


# Forecast future stock growth using the model
forecast = model_fit.forecast(steps=forecast_period)

# Create a new DataFrame for the forecasted values
forecast_df = pd.DataFrame({'Year': future_timestamps,
                            'Growing_Stock(m. cum)': forecast})


# In[239]:


# Plot actual and predicted values
plt.figure(figsize=(12, 6))
plt.plot(ts_data.index, ts_data['Growing_Stock(m. cum)'], label='Actual Data')
plt.plot(forecast_df['Year'], forecast_df['Growing_Stock(m. cum)'], label='Forecast')
plt.xlabel('Year')
plt.ylabel('Stock Growth')
plt.title('ARIMA Time Series Forecasting')
plt.legend()
plt.show()


# In[ ]:





# In[240]:


#Prepare the data for time-series analysis
# Assuming you have a column 'year' for the year and a column 'stock_growth' for the target variable
ts_data = df[['Year', 'Growing_Stock(m. cum)']].copy()


# In[241]:


# Convert the 'year' column to a datetime object and set it as the index
ts_data['Year'] = pd.to_datetime(ts_data['Year'], format='%Y')
ts_data.set_index('Year', inplace=True)


# In[242]:


# Forecast future stock growth for specific years
future_years = [2023, 2025, 2027, 2029]  # Specify the years for which you want to forecast
forecast_period = len(future_years)  # Number of periods to forecast

# Generate future timestamps based on the specified years
last_year = ts_data.index[-212].year
future_timestamps = pd.date_range(start=str(last_year + 2), periods=forecast_period, freq='AS')


# In[243]:


# Forecast future stock growth using the model
forecast = model_fit.forecast(steps=forecast_period)

# Create a new DataFrame for the forecasted values
forecast_df = pd.DataFrame({'Year': future_timestamps,
                            'Growing_Stock(m. cum)': forecast})


# In[244]:


# Plot actual and predicted values
plt.figure(figsize=(12, 6))
plt.plot(ts_data.index, ts_data['Growing_Stock(m. cum)'], label='Actual Data')
plt.plot(forecast_df['Year'], forecast_df['Growing_Stock(m. cum)'], label='Forecast')
plt.xlabel('Year')
plt.ylabel('Stock Growth')
plt.title('ARIMA Time Series Forecasting')
plt.legend()
plt.show()


# In[245]:


# Plot actual and predicted values
plt.figure(figsize=(12, 6))
sns.set_style("whitegrid")
sns.lineplot(data=ts_data, x=ts_data.index, y='Growing_Stock(m. cum)', label='Actual Data')
sns.lineplot(data=forecast_df, x='Year', y='Growing_Stock(m. cum)', label='Forecast')
plt.xlabel('Year')
plt.ylabel('Stock Growth')
plt.title('ARIMA Time Series Forecasting')
plt.legend()
plt.show()


# In[ ]:





# In[246]:


#Plotting the Bar Plot
plt.figure(figsize=(10, 6))
sns.barplot(x='Year', y='Growing_Stock(m. cum)', data=forecast_df, palette='Greens')
plt.xlabel('Year')
plt.ylabel('Forecasted Stock Growth')
plt.title('ARIMA Forecast Bar Plot')
plt.xticks(rotation=45)
plt.show()


# In[ ]:





# In[247]:


# Plotting the Area Plot
plt.figure(figsize=(10, 6))
sns.lineplot(x='Year', y='Growing_Stock(m. cum)', data=forecast_df, color='darkgreen', label='Actual')
sns.lineplot(x='Year', y='Growing_Stock(m. cum)', data=forecast_df, color='limegreen', label='Forecast')
#plt.fill_between(forecast_df['Year'], forecast_df['Growing_Stock(m. cum)'], forecast_df['ts_data.index'], color='limegreen', alpha=0.3)
plt.xlabel('Year')
plt.ylabel('Stock Growth')
plt.title('ARIMA Forecast Area Plot')
plt.legend()
plt.show()


# In[ ]:





# In[251]:


#Model Saved for deployment
import joblib
joblib.dump(gb, 'Future_We_Need.joblib')


# In[ ]:





# In[ ]:




