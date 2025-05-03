import pandas as pd
import numpy as np
import joblib
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report


iris = load_iris()
iris_df = pd.DataFrame(data=iris.data, columns=iris.feature_names)
iris_df['target'] = iris.target


np.random.seed(42)
num_outliers = 10  
outliers = pd.DataFrame({
    'sepal length (cm)': np.random.uniform(10, 15, num_outliers),  
    'sepal width (cm)': np.random.uniform(5, 8, num_outliers),     
    'petal length (cm)': np.random.uniform(8, 12, num_outliers),   
    'petal width (cm)': np.random.uniform(3, 5, num_outliers),     
    'target': np.random.randint(0, 3, num_outliers)               
})


iris_df_with_outliers = pd.concat([iris_df, outliers], ignore_index=True)


X = iris_df_with_outliers[iris.feature_names]
y = iris_df_with_outliers['target']


X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)


scaler = StandardScaler()
X_train_transformed = scaler.fit_transform(X_train)
X_test_transformed = scaler.transform(X_test)

model = LogisticRegression(random_state=42, max_iter=200)  
model.fit(X_train_transformed, y_train)


y_pred = model.predict(X_test_transformed)
accuracy = accuracy_score(y_test, y_pred)
print("Accuracy on test set:", accuracy)
print("\nConfusion Matrix:\n", confusion_matrix(y_test, y_pred))
print("\nClassification Report:\n", classification_report(y_test, y_pred, target_names=iris.target_names))

model_dict = {
    'scaler': scaler,
    'model': model,
    'accuracy': accuracy
}

joblib.dump(model_dict, 'iris_logistic_model_with_outliers.pkl')


loaded_dict = joblib.load('iris_logistic_model_with_outliers.pkl')
loaded_scaler = loaded_dict['scaler']
loaded_model = loaded_dict['model']
X_test_transformed_loaded = loaded_scaler.transform(X_test)
y_pred_loaded = loaded_model.predict(X_test_transformed_loaded)
print("Accuracy with loaded model on test set:", accuracy_score(y_test, y_pred_loaded))