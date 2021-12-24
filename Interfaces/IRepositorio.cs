using System.Collections.Generic;

namespace DIO.Series.Interfaces
{
    public interface IRepository<T>
    {
        List<T> List();
        T ReturnById(int id);        
        void Insert(T entity);        
        void excludes(int id);        
        void Updates(int id, T entity);
        int NextId();
    }
}