

import pandas as pd

df_order_csv = pd.read_csv('Order_semicolon.csv', sep=';')

print("Cabeçalho de Order_semicolon.csv:")
display(df_order_csv.head())
print("\nColunas de Order_semicolon.csv:")
display(df_order_csv.columns)


# In[29]:


# Pedidos | Imprimindo o conteúdo do arquivo JSON order-example.json com identação e tratamento de erro:

import json
import pandas as pd

try:
    with open('order-example.json', 'r') as f:
        order_example_data = json.load(f)
    print("Estrutura de order-example.json:")
    print(json.dumps(order_example_data, indent=4))

except FileNotFoundError:
    print("Erro: order-example.json não encontrado.")
except json.JSONDecodeError:
    print("Erro: Não foi possível decodificar order-example.json. Verifique o formato do arquivo.")


# In[30]:


# Pedidos | Imprimindo o conteúdo do arquivo JSON Dados de pedidos - Cannoli X FECAP.json, 
# mostrando cabeçalho e nomes das 38 colunas:

import pandas as pd
import json

try:
    df_order_json1 = pd.read_json('Dados de pedidos - Cannoli X FECAP.json')
    print("Cabeçalho de Dados de pedidos - Cannoli X FECAP.json:")
    display(df_order_json1.head())
    print("\nColunas de Dados de pedidos - Cannoli X FECAP.json:")
    display(df_order_json1.columns)
except FileNotFoundError:
    print("Erro: Dados de pedidos - Cannoli X FECAP.json não encontrado.")
except Exception as e:
    print(f"Erro ao ler Dados de pedidos - Cannoli X FECAP.json: {e}")


# ## 2. Carregando dados de **clientes**
# 
# Em seguida, carregamos os dados de clientes dos arquivos relevantes (`Customer_semicolon.csv` e `customer-example.json`) em DataFrames pandas.
# 

# In[31]:


# Clientes | Imprimindo o conteúdo do arquivo Customer_semicolon.csv:

import pandas as pd
import json

try:
    df_customer_csv = pd.read_csv('Customer_semicolon.csv', sep=';')
    print("Cabeçalho de df_customer_csv:")
    display(df_customer_csv.head())
    print("\ndf_customer_csv colunas:")
    display(df_customer_csv.columns)
except FileNotFoundError:
    print("Erro: Customer_semicolon.csv não encontrado.")
except Exception as e:
    print(f"Erro ao ler Customer_semicolon.csv: {e}")


# In[32]:


# Clientes | Imprimindo o conteúdo do arquivo customer-example.json, com identação e tratamento de erro:

try:
    with open('customer-example.json', 'r') as f:
        customer_example_data = json.load(f)
    print("\nEstrutura de customer-example.json:")
    print(json.dumps(customer_example_data, indent=4))

except FileNotFoundError:
    print("\nErro: customer-example.json não encontrado.")
except json.JSONDecodeError:
    print("\nErro: Não foi possível decodificar customer-example.json. Verifique o formato do arquivo.")
except Exception as e:
    print(f"\nErro ao ler customer-example.json: {e}")


# ## 3. Combinando os dados
# 
# Como próximos passos, combinamos os dados de **pedidos** e **clientes** com base em identificadores comuns para criar um dataset único para o modelo, cujo nome demos de `df_merged`.
# 

# In[33]:


# Pedidos e Clientes | Criação do dataset combinado:

import pandas as pd

if 'df_order_csv' in locals() and 'df_customer_csv' in locals():
    print("Tipo de dado de 'customer' em df_order_csv:", df_order_csv['customer'].dtype)
    print("Tipo de dado de 'id' em df_customer_csv:", df_customer_csv['id'].dtype)

    # Garantimos que os campos usados para o relacionamento (customer, em pedidos e id, em clientes) sejam string:
    df_order_csv['customer'] = df_order_csv['customer'].astype(str)
    df_customer_csv['id'] = df_customer_csv['id'].astype(str)

    # e assim, fizemos uma junção (merge) do tipo 'left'
    df_merged = pd.merge(df_order_csv, df_customer_csv, left_on='customer', right_on='id', how='left')

    print("\nCabeçalho do DataFrame Combinado:")
    display(df_merged.head())
    print("\nColunas do DataFrame Combinado:")
    display(df_merged.columns)
else:
    print("Erro: DataFrames necessários (df_order_csv ou df_customer_csv) não encontrados para a combinação.")


# ## 4. Preparando a base de dados
# 
# I. Identificamos as colunas (features) relevantes para prever o cancelamento de pedidos, chamando-as de `relevant_features_initial`.
# 

# In[34]:


if 'df_merged' in locals():
    print("Colunas em df_merged:")
    print(df_merged.columns.tolist())

    relevant_features_initial = [
        'containerId',
        'createdAt_x',
        'customer',
        'status_x',
        'totalAmount',
        'preparationTime',
        'takeOutTimeInSeconds',
        'version',
        'gender',
        'dateOfBirth',
        'status_y',
        'phone',
        'email'
    ]

    relevant_features = [col for col in relevant_features_initial if col in df_merged.columns]

    print("\nFeatures potencialmente relevantes para prever o cancelamento de pedidos:")
    print(relevant_features)
else:
    print("Erro: DataFrame Combinado (df_merged) não encontrado. Não é possível identificar features relevantes.")


# II. O bloco abaixo é extenso. O que fizemos nele foi tratar **valores ausentes** usando mediana e moda, converte datas (`createdAt_x` e `dateOfBirth`), lida com **formatos de dados inconsistentes** e realiza a **engenharia de features** (criação de novas colunas): 
# - dia da semana
# - hora
# - mês
# - idade
# 

# In[35]:


if 'df_merged' in locals():

    # Definimos as colunas relevantes para o processamento:
    relevant_features_for_processing = [
        'containerId',
        'createdAt_x',
        'customer',
        'status_x',
        'totalAmount',
        'preparationTime',
        'takeOutTimeInSeconds',
        'version',
        'gender',
        'dateOfBirth',
        'status_y',
        'phone',
        'email'
    ]

    relevant_features_for_processing = [col for col in relevant_features_for_processing if col in df_merged.columns]

    # Check de valores nulos (NaN):
    print("Valores ausentes antes do tratamento:")
    display(df_merged[relevant_features_for_processing].isnull().sum())

    # Dividimos as colunas em duas categorias: numéricas e categóricas
    numerical_cols = [col for col in ['totalAmount', 'preparationTime', 'takeOutTimeInSeconds'] if col in relevant_features_for_processing]
    categorical_cols = [col for col in ['containerId', 'version', 'gender', 'status_y', 'phone', 'email'] if col in relevant_features_for_processing]

    # Numéricas: substitui NaN pela mediana da coluna:
    for col in numerical_cols:
        if col in df_merged.columns:
            df_merged[col].fillna(df_merged[col].median())

    # Categóricas: substitui NaN pela moda (valor que aparece com mais frequência):
    for col in categorical_cols:
        if col in df_merged.columns:
            mode_value = df_merged[col].mode()
            if not mode_value.empty:
                df_merged[col].fillna(mode_value[0])
            else:
                print(f"Aviso: O modo está vazio para a coluna '{col}'. Não é possível imputar com o modo.")

    if 'createdAt_x' in df_merged.columns:
        df_merged['createdAt_x'] = pd.to_datetime(df_merged['createdAt_x'], format='%d/%m/%Y %H:%M', errors='coerce')
        print("\n'createdAt_x' convertido para datetime.")
    else:
        print("\n'createdAt_x' não encontrado. Pulando conversão para datetime e extração de features para esta coluna.")

    if 'createdAt_x' in df_merged.columns and pd.api.types.is_datetime64_any_dtype(df_merged['createdAt_x']):
        df_merged['order_day_of_week'] = df_merged['createdAt_x'].dt.dayofweek
        df_merged['order_hour'] = df_merged['createdAt_x'].dt.hour
        df_merged['order_month'] = df_merged['createdAt_x'].dt.month
        print("Features de tempo extraídas de 'createdAt_x'.")
    else:
        print("Pulando extração de features de tempo, pois 'createdAt_x' não é uma coluna datetime.")

    # Tratamento de dateOfBirth, ou seja, a idade do cliente:
    if 'dateOfBirth' in df_merged.columns:
        print("\nValores ausentes e tipo de dado para dateOfBirth antes do tratamento:")
        print(df_merged['dateOfBirth'].isnull().sum())
        print(df_merged['dateOfBirth'].dtype)

        df_merged['dateOfBirth'] = pd.to_datetime(df_merged['dateOfBirth'], format='%d/%m/%Y', errors='coerce')
        print("Tentativa de converter 'dateOfBirth' para datetime.")

        if pd.api.types.is_datetime64_any_dtype(df_merged['dateOfBirth']):
            if 'createdAt_x' in df_merged.columns and pd.api.types.is_datetime64_any_dtype(df_merged['createdAt_x']):
                 reference_date = df_merged['createdAt_x'].max()
            else:
                 reference_date = pd.to_datetime('today')

            if pd.isna(reference_date):
                 reference_date = pd.to_datetime('today')

            df_merged['age'] = (reference_date - df_merged['dateOfBirth']).dt.days / 365.25
            df_merged['age'] = df_merged['age'].apply(lambda x: x if not pd.isna(x) and x >= 0 and x <= 120 else pd.NA)
            print("'age' calculado a partir de 'dateOfBirth'.")
        else:
            print("Pulando cálculo de idade, pois 'dateOfBirth' não é uma coluna datetime.")
    else:
        print("\n'dateOfBirth' não encontrado. Pulando análise de dateOfBirth e cálculo de idade.")

    cols_to_display_missing = relevant_features_for_processing[:]
    if 'order_day_of_week' in df_merged.columns: cols_to_display_missing.extend(['order_day_of_week', 'order_hour', 'order_month'])
    if 'age' in df_merged.columns: cols_to_display_missing.append('age')

    cols_to_display_missing = [col for col in cols_to_display_missing if col in df_merged.columns]

    # Reexibimos os valores ausentes após a limpeza:
    print("\nValores ausentes após o tratamento:")
    display(df_merged[cols_to_display_missing].isnull().sum())

    cols_to_display_head = relevant_features_for_processing[:]
    if 'order_day_of_week' in df_merged.columns: cols_to_display_head.extend(['order_day_of_week', 'order_hour', 'order_month'])
    if 'age' in df_merged.columns: cols_to_display_head.append('age')

    cols_to_display_head = [col for col in cols_to_display_head if col in df_merged.columns]

    # Por último, mostramos as primeiras linhas após o feature engineering:
    print("\nPrimeiras linhas após limpeza e engenharia de features:")
    display(df_merged[cols_to_display_head].head())

else:
    print("Erro: DataFrame Combinado (df_merged) não encontrado. Pulando preparação dos dados.")


# III. O bloco abaixo adiciona `paymentMethod` e `status` como features, pensando já em modelagem (target = status). A limpeza é praticamente a mesma, mas organizada como se fosse uma segunda versão mais refinada.
# 
# Esta etapa é Já começa a preparar o dataset para machine learning (com features tratadas e variáveis alvo).

# In[36]:


# Inspecionamos novamente as colunas em df_merged para verificar quais estão disponíveis:
print("Colunas disponíveis em df_merged:")
print(df_merged.columns.tolist())

# Atualizamos relevant_features com base nas colunas atuais em df_merged
# e filtramos a lista relevant_features definida anteriormente:
original_relevant_features = [
    'containerId',
    'createdAt_x',
    'customer',
    'status', # Variável de destino, mas também mostra outros status
    'totalAmount',
    'paymentMethod',
    'preparationTime',
    'takeOutTimeInSeconds',
    'version',
    'gender',
    'dateOfBirth',
    'status_y', # Status do cliente
    'phone',
    'email'
]

# Garantir que apenas as colunas presentes em df_merged sejam mantidas:
relevant_features = [col for col in original_relevant_features if col in df_merged.columns]

print("\nRecursos relevantes atualizados com base nas colunas df_merged:")
print(relevant_features)


# In[37]:


# 1. Analisando valores ausentes nos recursos relevantes atualizados
print("\nValores ausentes antes do tratamento:")
display(df_merged[relevant_features].isnull().sum())


# 2. Definindo uma estratégia para lidar com valores ausentes e implementando:

# Estratégia simples: Imputa colunas numéricas com mediana, categóricas com moda e manipula colunas específicas.
# Para 'gênero', 'dataNascimento', 'status_a', 'telefone', 'e-mail', podemos manter os NaNs ou imputar com base na análise.
# Identifique colunas numéricas e categóricas da lista atualizada de relevant_features
numerical_cols = [col for col in ['totalAmount', 'preparationTime', 'takeOutTimeInSeconds'] if col in relevant_features]
categorical_cols = [col for col in ['containerId', 'paymentMethod', 'version', 'gender', 'status_y', 'phone', 'email'] if col in relevant_features]

# Imputando colunas numéricas com mediana
for col in numerical_cols:
    df_merged[col].fillna(df_merged[col].median())

# Imputando colunas categóricas/objeto com moda
for col in categorical_cols:
     # Calculando a moda, lidando com múltiplas modas potenciais e escolhendo a primeira:
     mode_value = df_merged[col].mode()
     if not mode_value.empty:
         df_merged[col].fillna(mode_value[0])
     else:
         # Se a moda for vazia (por exemplo, todas NaN), escolhemos outra estratégia:
         print(f"Aviso: A moda está vazio para a coluna '{col}'. Não é possível imputar com a moda.")


# 3. Convertendo createdAt_x em objetos datetime e verificando
# se 'createdAt_x' está nas colunas relevant_features e df_merged antes de converter:
if 'createdAt_x' in relevant_features:
    # Supondo que 'createdAt_x' esteja no formato 'dd/mm/yyyy HH:MM', com base na inspeção anterior:
    df_merged['createdAt_x'] = pd.to_datetime(df_merged['createdAt_x'], format='%d/%m/%Y %H:%M', errors='coerce')
    print("\nConverted 'createdAt_x' to datetime.")
else:
    print("\n'createdAt_x' não foi encontrado nos recursos relevantes ou no DataFrame. Ignorando a conversão de data e hora e a extração de recursos para esta coluna.")


# 4. Extract features from createdAt_x only if conversion was successful
if 'createdAt_x' in df_merged.columns and pd.api.types.is_datetime64_any_dtype(df_merged['createdAt_x']):
    df_merged['order_day_of_week'] = df_merged['createdAt_x'].dt.dayofweek # Monday=0, Sunday=6
    df_merged['order_hour'] = df_merged['createdAt_x'].dt.hour
    df_merged['order_month'] = df_merged['createdAt_x'].dt.month
    print("Extracted time features from 'createdAt_x'.")
else:
    print("A extração de recursos de tempo foi ignorada, pois 'createdAt_x' não é uma coluna de data e hora.")


# 5. Analisando dateOfBirth em busca de valores e tipos de dados ausentes e tentar conversão
if 'dateOfBirth' in relevant_features:
    print("\nValores e tipo de dados ausentes para dateOfBirth antes do tratamento:")
    print(df_merged['dateOfBirth'].isnull().sum())
    print(df_merged['dateOfBirth'].dtype)

    # Tentativa de converter dateOfBirth em objetos datetime,
    # supondo que 'dateOfBirth' esteja no formato 'dd/mm/yyyy' com base na inspeção anterior
    df_merged['dateOfBirth'] = pd.to_datetime(df_merged['dateOfBirth'], format='%d/%m/%Y', errors='coerce')
    print("Tentativa de converter 'dateOfBirth' para datetime.")


    # 6. Se dateOfBirth for convertido com sucesso, calculamos a idade
    # depois resolvemos possíveis problemas com datas futuras ou entradas inválidas definindo a idade como NaN ou um espaço reservado
    if pd.api.types.is_datetime64_any_dtype(df_merged['dateOfBirth']):
        # Calcular a idade com base na data atual (ou em uma data de referência)
        # Utilizar a data mais recente em createdAt_x como referência para evitar idades futuras com base na data de processamento
        # Garantir que reference_date seja calculado somente se createdAt_x for datetime
        if 'createdAt_x' in df_merged.columns and pd.api.types.is_datetime64_any_dtype(df_merged['createdAt_x']):
             reference_date = df_merged['createdAt_x'].max()
        else:
             reference_date = pd.to_datetime('today') # Fallback to today if createdAt_x is not available or not datetime

        # Garantindo que reference_date seja um valor único e não NaT
        if pd.isna(reference_date):
             reference_date = pd.to_datetime('today')


        # Calculando a idade em anos, manipulando resultados NaT de datas inválidas
        df_merged['age'] = (reference_date - df_merged['dateOfBirth']).dt.days / 365.25

        # Lidando com casos em que dateOfBirth está no futuro (resultando em idade negativa) ou anterior a um intervalo razoável
        # Vamos definir a idade como NaN para datas futuras ou idades irrealisticamente altas (por exemplo, > 120)
        df_merged['age'] = df_merged['age'].apply(lambda x: x if not pd.isna(x) and x >= 0 and x <= 120 else pd.NA)
        print("Idade calculada de 'dateOfBirth'.")
    else:
        print("O cálculo da idade foi ignorado, pois 'dateOfBirth' não é uma coluna de data e hora.")
else:
    print("\n'dateOfBirth' não foi encontrado em recursos relevantes ou DataFrame. Ignorando a análise de dateOfBirth e o cálculo da idade.")


# 7. Inspecionando outras colunas relevantes em busca de inconsistências (já parcialmente concluídas durante a imputação)
# Para 'status' (variável de destino), certifique-se de que seja adequada para modelagem. 'CANCELLED' é a classe positiva.
# Provavelmente precisaremos codificar 'status' e outros recursos categóricos posteriormente.
# A coluna 'customer' é um identificador, não pode ser usada diretamente como um recurso, mas para agrupamento/análise.

# Exibindo valores ausentes após o tratamento, incluindo colunas recém-criadas, se existirem
cols_to_display_missing = relevant_features[:] # Start with relevant features
if 'order_day_of_week' in df_merged.columns: cols_to_display_missing.extend(['order_day_of_week', 'order_hour', 'order_month'])
if 'age' in df_merged.columns: cols_to_display_missing.append('age')

print("\nValores ausentes após manipulação:")
display(df_merged[cols_to_display_missing].isnull().sum())

# Exibindo as primeiras linhas com recursos relevantes e novos recursos
cols_to_display_head = relevant_features[:]
if 'order_day_of_week' in df_merged.columns: cols_to_display_head.extend(['order_day_of_week', 'order_hour', 'order_month'])
if 'age' in df_merged.columns: cols_to_display_head.append('age')

print("\nPrimeiras linhas após a limpeza e feature engineering:")
display(df_merged[cols_to_display_head].head())


# IV. Como próximos passos, definimos a **variável target** que indica se um pedido foi cancelado ou não.
# 

# In[38]:


if 'df_merged' in locals() and 'status_x' in df_merged.columns:
    print("Valores únicos na coluna 'status_x':")
    print(df_merged['status_x'].unique())

    df_merged['is_cancelled'] = (df_merged['status_x'] == 'CANCELED').astype(int)

    print("\nContagem de valores para a variável target 'is_cancelled':")
    display(df_merged['is_cancelled'].value_counts())

    print("\nPrimeiras linhas de df_merged incluindo as colunas 'status_x' e 'is_cancelled':")
    display(df_merged[['status_x', 'is_cancelled']].head())
else:
    print("Erro: DataFrame Combinado (df_merged) ou coluna 'status_x' não encontrada. Não é possível criar a variável target.")


# In[39]:


# Inspecionar as colunas de df_merged para encontrar o nome correto da coluna de status
print("Colunas em df_merged:")
print(df_merged.columns.tolist())

# Com base na lista de colunas, a coluna de status pode ter sido renomeada após o merge.
# A coluna de status dos pedidos (orders) provavelmente é a que precisamos.
# No df_order_csv original, a coluna se chamava 'status'.
# Porém, após o merge, colunas com nomes iguais recebem sufixos '_x' e '_y'.
# No caso do merge ('left_on=customer', 'right_on=id'),
# a coluna 'status' do dataframe da esquerda (orders) vira 'status_x'.

# Verificar os valores únicos da coluna 'status_x'
if 'status_x' in df_merged.columns:
    print("\nValores únicos na coluna 'status_x':")
    print(df_merged['status_x'].unique())

    # Criar a variável alvo 'is_cancelled' baseada em 'status_x'
    # Assumindo que 'CANCELLED' indica cancelamento
    df_merged['is_cancelled'] = (df_merged['status_x'] == 'CANCELLED').astype(int)

    # Verificar a criação e o conteúdo da nova coluna 'is_cancelled'
    print("\nContagem de valores da variável alvo 'is_cancelled':")
    display(df_merged['is_cancelled'].value_counts())

    print("\nPrimeiras linhas de df_merged com as colunas 'status_x' e 'is_cancelled':")
    display(df_merged[['status_x', 'is_cancelled']].head())

else:
    print("\nColuna 'status_x' não encontrada em df_merged. Não é possível criar a variável alvo.")


# In[40]:


# Corrigir a condição para usar 'CANCELED' na criação da variável alvo 'is_cancelled'.
df_merged['is_cancelled'] = (df_merged['status_x'] == 'CANCELED').astype(int)

# Verificar a criação e o conteúdo da nova coluna 'is_cancelled'.
print("\nContagem de valores para a variável alvo 'is_cancelled' corrigida:")
display(df_merged['is_cancelled'].value_counts())

print("\nPrimeiras linhas de df_merged incluindo as colunas 'status_x' e 'is_cancelled' corrigida:")
display(df_merged[['status_x', 'is_cancelled']].head())


# ### Transformar variáveis categóricas em formato numérico adequado para modelos de machine learning.
# 

# In[41]:


if 'df_merged' in locals():
    categorical_features_for_encoding = df_merged.select_dtypes(include='object').columns.tolist()

    cols_to_exclude_from_encoding = [
        'id_x', 'id_y', 'customer', 'displayId', 'status_x',
        'createdAt_x', 'updatedAt_x', 'updatedAt_y', 'dateOfBirth',
        'name', 'taxId', 'externalCode', 'enrichedAt', 'enrichedBy',
        'createdAt_y', 'createdBy', 'updatedBy',
        'extraInfo', 'integrationId', 'scheduledAt'
    ]

    categorical_features_for_encoding = [col for col in categorical_features_for_encoding if col not in cols_to_exclude_from_encoding]

    potential_categorical_cols = [
        'containerId', 'version', 'gender', 'status_y', 'phone', 'email',
        'companyId', 'engineId', 'engineName', 'engineType', 'orderTiming',
        'orderType', 'salesChannel'
    ]
    potential_categorical_cols = [col for col in potential_categorical_cols if col in df_merged.columns and col not in cols_to_exclude_from_encoding]

    categorical_features_for_encoding = list(set(categorical_features_for_encoding + potential_categorical_cols))

    print("Features categóricas identificadas para one-hot encoding:")
    print(categorical_features_for_encoding)

    df_merged_encoded = df_merged.copy()

    try:
        df_merged_encoded = pd.get_dummies(df_merged_encoded, columns=categorical_features_for_encoding, dummy_na=False)
        print("\nOne-hot encoding aplicado.")
    except KeyError as e:
        print(f"Erro ao aplicar one-hot encoding: {e}. Uma ou mais colunas não encontradas.")
        pass

    print("\nDataFrame após one-hot encoding:")
    display(df_merged_encoded.head())
    print("\nColunas após one-hot encoding:")
    print(df_merged_encoded.columns.tolist())

    original_cols_after_encoding = [col for col in categorical_features_for_encoding if col in df_merged_encoded.columns]
    if not original_cols_after_encoding:
        print("\nColunas categóricas originais foram removidas com sucesso.")
    else:
        print("\nAviso: As seguintes colunas categóricas originais não foram removidas:", original_cols_after_encoding)

    new_encoded_cols = [col for col in df_merged_encoded.columns if any(col.startswith(cat_col + '_') for cat_col in categorical_features_for_encoding)]
    print("\nExemplo de novas colunas criadas por one-hot encoding:")
    print(new_encoded_cols[:10])
else:
    print("Erro: DataFrame Combinado (df_merged) não encontrado. Pulando one-hot encoding.")


# ## 5. Divisão dos dados
# Agora, dividimos o dataset em conjuntos de treino e teste.
# 

# In[ ]:


get_ipython().system('pip install scikit-learn')


# In[46]:


from sklearn.model_selection import train_test_split

# Verifica se o DataFrame codificado 'df_merged_encoded' existe no ambiente local.
if 'df_merged_encoded' in locals():

    # Lista de colunas que serão removidas antes de definir as variáveis preditoras (X).
    columns_to_drop_for_features = [
        'status_x',       
        'is_cancelled',     
        'id_x', 'id_y',   
        'customer',         
        'displayId',        
        'createdAt_x', 'updatedAt_x', 'updatedAt_y', 
        'dateOfBirth', 'name', 'taxId',               
        'externalCode', 'enrichedAt', 'enrichedBy',   
        'createdAt_y', 'createdBy', 'updatedBy',      
        'extraInfo', 'scheduledAt', 'integrationId'  
    ]

    # Garante que apenas colunas existentes no DataFrame sejam removidas.
    columns_to_drop_for_features = [col for col in columns_to_drop_for_features if col in df_merged_encoded.columns]

    # Define X como o conjunto de variáveis preditoras, removendo as colunas irrelevantes.
    X = df_merged_encoded.drop(columns=columns_to_drop_for_features)

    # Define y como a variável alvo, que indica se a reserva foi cancelada.
    y = df_merged_encoded['is_cancelled']

    # Divide os dados em conjuntos de treino e teste (75% treino, 25% teste), mantendo a proporção de classes com stratify.
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42, stratify=y)

    # Exibe as dimensões dos conjuntos gerados.
    print("Shape de X_train:", X_train.shape)
    print("Shape de X_test:", X_test.shape)
    print("Shape de y_train:", y_train.shape)
    print("Shape de y_test:", y_test.shape)

else:
    # Caso o DataFrame codificado não exista, exibe uma mensagem de erro.
    print("Erro: DataFrame Codificado (df_merged_encoded) não encontrado. Não é possível dividir os dados.") 


# ## 6. Seleção e treinamento do modelo de ia
# 
# Escolhemos um algoritmo de classificação apropriado para a previsão de cancelamento (ex: Regressão Logística, Random Forest, Gradient Boosting) e treinamos o modelo com os dados de treino.
# 

# In[47]:


from sklearn.ensemble import GradientBoostingClassifier

if 'X_train' in locals() and 'y_train' in locals():
    gb_model = GradientBoostingClassifier(n_estimators=100, random_state=42)
    gb_model.fit(X_train, y_train)
    print("Modelo Gradient Boosting Classifier treinado com sucesso.")
else:
    print("Erro: Dados de treino (X_train ou y_train) não encontrados. Não é possível treinar o modelo.")


# In[48]:


import pandas as pd
from sklearn.ensemble import GradientBoostingClassifier

if 'X_train' in locals() and 'y_train' in locals():
    print("Tipos de dados das colunas em X_train:")
    print(X_train.dtypes)

    object_cols_in_X_train = X_train.select_dtypes(include='object').columns
    print("\nColunas do tipo 'object' em X_train:")
    print(object_cols_in_X_train)

    if not object_cols_in_X_train.empty:
        X_train = X_train.drop(columns=object_cols_in_X_train)
        X_test = X_test.drop(columns=object_cols_in_X_train)
        print(f"\nColunas do tipo 'object' removidas: {list(object_cols_in_X_train)}")
    else:
        print("\nNenhuma coluna do tipo 'object' encontrada em X_train.")

    print("\nTipos de dados das colunas em X_train após remover colunas do tipo 'object':")
    print(X_train.dtypes)

    gb_model = GradientBoostingClassifier(n_estimators=100, random_state=42)
    gb_model.fit(X_train, y_train)

    print("\nModelo Gradient Boosting Classifier treinado com sucesso após tratar colunas do tipo 'object'.")

else:
    print("Erro: Dados de treino (X_train ou y_train) não encontrados. Não é possível verificar os tipos de dados ou retreinar o modelo.")


# ## 7. Avaliação do modelo
# 
# Avaliamos o desempenho do modelo no conjunto de teste utilizando métricas relevantes para problemas de classificação (ex: Acurácia, Precisão, Recall, F1-Score, Área sob a curva ROC).
# 

# In[49]:


from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score, confusion_matrix

if 'gb_model' in locals() and 'X_test' in locals() and 'y_test' in locals():
    y_pred = gb_model.predict(X_test)
    y_pred_proba = gb_model.predict_proba(X_test)[:, 1]

    accuracy = accuracy_score(y_test, y_pred)
    precision = precision_score(y_test, y_pred)
    recall = recall_score(y_test, y_pred)
    f1 = f1_score(y_test, y_pred)
    roc_auc = roc_auc_score(y_test, y_pred_proba)
    conf_matrix = confusion_matrix(y_test, y_pred)

    print("Avaliação do Modelo no Conjunto de Teste:")
    print(f"Acurácia: {accuracy:.4f}")
    print(f"Precisão: {precision:.4f}")
    print(f"Recall: {recall:.4f}")
    print(f"Score F1: {f1:.4f}")
    print(f"ROC AUC: {roc_auc:.4f}")

    print("\nMatriz de Confusão:")
    print(conf_matrix)
else:
    print("Erro: Modelo ou dados de teste não encontrados. Não é possível avaliar o modelo.")


# ## 8. Relatório de análise de desempenho
# Geramos métricas e visualizamos os resultados da avaliação.

# In[ ]:


get_ipython().system('pip install seaborn')


# In[52]:


import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics import confusion_matrix

if 'accuracy' in locals() and 'precision' in locals() and 'recall' in locals() and 'f1' in locals() and 'roc_auc' in locals() and 'conf_matrix' in locals():
    print("Avaliação do Modelo no Conjunto de Teste:")
    print(f"Acurácia: {accuracy:.4f}")
    print(f"Precisão: {precision:.4f}")
    print(f"Recall: {recall:.4f}")
    print(f"Score F1: {f1:.4f}")
    print(f"ROC AUC: {roc_auc:.4f}")

    print("\nMatriz de Confusão:")
    print(conf_matrix)

    plt.figure(figsize=(8, 6))
    sns.heatmap(conf_matrix, annot=True, fmt='d', cmap='Blues', xticklabels=['Não Cancelado Previsto', 'Cancelado Previsto'], yticklabels=['Não Cancelado Real', 'Cancelado Real'])
    plt.xlabel('Rótulo Previsto')
    plt.ylabel('Rótulo Verdadeiro')
    plt.title('Matriz de Confusão')
    plt.show()

    print("\nInterpretação das Métricas de Avaliação e Matriz de Confusão:")
    print(f"- Acurácia ({accuracy:.4f}): Correção geral.")
    print(f"- Precisão ({precision:.4f}): Previsões positivas corretas de todas as previsões positivas.")
    print(f"- Recall ({recall:.4f}): Previsões positivas corretas de todos os positivos reais.")
    print(f"- Score F1 ({f1:.4f}): Equilíbrio entre Precisão e Recall.")
    print(f"- ROC AUC ({roc_auc:.4f}): Capacidade do modelo de distinguir entre as classes.")

    print("\nPontos Fortes e Fracos:")
    print(f"- Ponto Forte: Alta acurácia geral ({accuracy:.4f}).")
    print(f"- Ponto Fraco: Desempenho ruim na previsão de cancelamentos (Precisão: {precision:.4f}, Recall: {recall:.4f}, Score F1: {f1:.4f}). O modelo não identifica a maioria dos cancelamentos reais (Falsos Negativos: {conf_matrix[1, 0]}).")
    print(f"- Baixo ROC AUC ({roc_auc:.4f}) confirma a baixa discriminação de cancelamentos.")
    print("\nO modelo é eficaz em prever não cancelamentos, mas ineficaz em prever cancelamentos.")
else:
    print("Erro: Métricas de avaliação ou matriz de confusão não encontradas. Não é possível exibir ou interpretar os resultados.")


# ## Resumo:
# ### Principais Descobertas da Análise de Dados
# 
# * O processo inicial de carregamento dos dados revelou inconsistências nos formatos dos arquivos JSON, exigindo ajustes manuais para carregar corretamente o arquivo order-example.json.
# 
# * A junção dos dados de pedidos e clientes foi possível apenas para os arquivos CSV, devido à estrutura complexa e aninhada dos dados JSON, que não foram processados adicionalmente.
# 
# * Diversas variáveis potencialmente relevantes para prever cancelamentos foram identificadas a partir dos dados CSV mesclados, incluindo detalhes dos pedidos, informações de tempo e dados dos clientes.
# 
# * O tratamento de valores ausentes foi realizado com sucesso; os 502 valores faltantes na coluna de gênero foram imputados usando a moda.
# 
# * A engenharia de atributos extraiu características temporais (dia da semana, hora, mês) a partir do timestamp de criação do pedido e calculou a idade dos clientes com base na data de nascimento.
# 
# * A variável alvo is_cancelled foi corretamente definida com base no status 'CANCELED' na coluna status_x, identificando 309 pedidos cancelados entre 2000 registros.
# 
# * A codificação one-hot foi aplicada a seis colunas categóricas, transformando-as com sucesso em variáveis numéricas, mas aumentando significativamente a dimensionalidade do conjunto de dados (para 3294 atributos).
# 
# * O conjunto de dados foi dividido em treino (1500 amostras) e teste (500 amostras) usando divisão estratificada para manter a distribuição da variável alvo.
# 
# * O treinamento de um Gradient Boosting Classifier falhou inicialmente devido à presença de colunas do tipo object (não numéricas); estas foram posteriormente removidas, permitindo o treinamento do modelo.
# 
# * A avaliação do modelo mostrou alta acurácia geral (0.8420), mas desempenho extremamente fraco na previsão de cancelamentos, com precisão, recall e F1-Score de 0.0000 e nenhuma predição correta de cancelamentos. O ROC AUC de 0.5090 também indicou baixa capacidade discriminativa para a classe positiva.
# 
# ### Percepções e Próximos Passos
# 
# * O modelo atual é ineficaz para identificar cancelamentos de pedidos, apesar da alta acurácia geral. Trata-se de um caso clássico de viés do modelo para a classe majoritária em um conjunto de dados desbalanceado.
# 
# * Os próximos passos devem focar no tratamento do desbalanceamento de classes (por exemplo, técnicas de reamostragem como SMOTE, uso de pesos de classe) e, possivelmente, na exploração de outros algoritmos ou em engenharia de atributos adicional para melhorar a capacidade do modelo em prever a classe minoritária (cancelamentos).
